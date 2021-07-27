import { FC, ReactElement, useCallback, useContext } from "react"
import { Panel, Uploader as Upload, Button } from "rsuite"
import { FileType } from "rsuite/lib/Uploader"
import { EditorContext } from "."

const Uploader: FC = (): ReactElement => {
  const { setClothSide, cloth_side_id } = useContext(EditorContext)

  const onSelectFile = useCallback((e: FileType[]) => {
    console.log(e)
    if (e.length > 0) {
      const [file] = e;
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file.blobFile!);
      fileReader.onload = () => {
        const img = new Image();
        img.onload = () => {
          console.log(img.width, img.height)
          setClothSide({
            cloth_side_id,
            design_x: 0,
            design_y: 0,
            design_file: file.blobFile!,
            design_height: img.height,
            design_width: img.width
          });
        }
        img.src = `${fileReader.result}`;
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
      <Upload onChange={onSelectFile} accept="image/png" listType="picture-text" multiple={false} autoUpload={false}>
        <Button color="blue">Pilih file design</Button>
      </Upload>
    </Panel>
  )
}

export default Uploader
