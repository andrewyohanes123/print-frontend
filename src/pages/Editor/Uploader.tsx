import { FC, ReactElement, useCallback, useContext, useState } from "react"
import { Panel, Uploader as Upload, Button, Divider } from "rsuite"
import { FileType } from "rsuite/lib/Uploader"
import { EditorContext } from "."
import OrderClothSidePanel from "./OrderClothSidePanel"

const Uploader: FC = (): ReactElement => {
  const { setClothSide, cloth_side_id, cloth_sides } = useContext(EditorContext)
  const [list, setList] = useState<FileType[]>([]);

  const onSelectFile = useCallback((e: FileType[]) => {
    console.log(e)
    setList(e);
    if (e.length > 0) {
      const [file] = e;
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file.blobFile!);
      const maxWidth: number = 40;
      const maxHeight: number = 40;
      fileReader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setTimeout(() => {
            setList([]);
          }, 500);
          const ratio: number = Math.min(maxWidth / img.width, maxHeight / img.height)
          console.log(img.width * ratio, img.height * ratio)
          setClothSide!({
            cloth_side_id,
            design_x: 0,
            design_y: 0,
            design_file: file.blobFile!,
            design_height: img.height * ratio,
            design_width: img.width * ratio,
            design_rotation: 0
          });
        }
        img.src = `${fileReader.result}`;
        console.log(cloth_side_id)
      }
    }
    // setClothSide({
    //   cloth_side_id,
    //   design_x: 0,
    //   design_y: 0,
    //   design_height
    // })
  }, [setClothSide, cloth_side_id])

  return (
    <Panel style={{ marginTop: 8 }} bordered>
      <Upload fileListVisible={false} key={`${list.length}`} fileList={list} onChange={onSelectFile} accept="image/png" listType="picture-text" multiple={false} autoUpload={false}>
        <Button color="blue">Pilih file design</Button>
      </Upload>
      {cloth_sides.length > 0 ?
        <>
          <Divider />
          {
            cloth_sides.map(side => (
              <OrderClothSidePanel key={side.cloth_side_id} cloth_side_id={side.cloth_side_id!} src={URL.createObjectURL(side.design_file)} alt={`${side.cloth_side_id!}`} />
            ))
          }
        </>
        :
        <p className="secondary-text">Pilih file design</p>
      }
      {cloth_sides.length > 0 && <>
        <Divider />
        <h5>Total Harga: Rp. {`${cloth_sides.length * 25000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
      </>}
    </Panel>
  )
}

export default Uploader
