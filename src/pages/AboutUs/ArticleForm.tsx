import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { Form, FormControl, ControlLabel, Schema, FormGroup, Button, Icon } from "rsuite"

const schema = Schema.Model({
  content: Schema.Types.StringType('Masukkan').isRequired('Masukkan isi artikel').minLength(10, 'Masukkan minimal 10 karakter'),
})

interface props {
  onSubmit: (val: any) => void;
  content?: string;
}

const ArticleForm: FC<props> = ({ onSubmit, content }): ReactElement => {
  const [formValue, setFormValue] = useState<any>({});
  const [key, setKey] = useState<number>(0);

  const onFinish = useCallback((valid: boolean) => {
    valid && onSubmit(formValue);
  }, [onSubmit, formValue]);

  useEffect(() => {
    if (typeof content !== 'undefined') {
      setFormValue({ content });
      setKey(Math.round(Math.random() * 100));
    }
  }, [content]);

  return (
    <Form key={key.toString()} formValue={formValue} onSubmit={onFinish} onChange={setFormValue} fluid model={schema}>
      <FormGroup>
        <ControlLabel>Isi Artikel</ControlLabel>
        <FormControl name="content" rows={8} placeholder="Isi Artikel" componentClass="textarea" />
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="green"><Icon icon="save" />&nbsp;Simpan</Button>
      </FormGroup>
    </Form>
  )
}

export default ArticleForm
