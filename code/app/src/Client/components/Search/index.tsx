import { Button, FormControl, InputGroup } from "react-bootstrap"



type TProps = {
  text: string
  onChangeInput: (event: React.ChangeEvent<any>) => void
  onClickSend: () => void
}

export default function ({ text, onChangeInput }: TProps) {


  return (
    <InputGroup>
      <FormControl
        value={text}
        onChange={onChangeInput}
        placeholder="Search"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      {/*

            <Button 
      variant="warning" 
      id="serach-send">
        Search
      </Button>
    
      */}
    </InputGroup>
  )
}