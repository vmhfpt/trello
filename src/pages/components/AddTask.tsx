import { Button, TextField } from "@mui/material";
import Joi from "joi";
import CloseIcon from "@mui/icons-material/Close";
import { ITask } from "../../interface/task.interface";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { randomID } from "../../util/randomID";
import { Dispatch, SetStateAction } from "react";
const schema = Joi.object({
  name: Joi.string().required(),
  id: Joi.allow(),
  content: Joi.allow(),
  date: Joi.allow(),
  status: Joi.allow(),
});
interface IAddTaskProp {
    closeForm : Dispatch<SetStateAction<string>>;
    setCards : Dispatch<SetStateAction<ITask[]>>;
    setLocalStorage : Dispatch<SetStateAction<any>>;
    cards : ITask[];
}
export default function AddTask({closeForm, setCards, setLocalStorage , cards} : IAddTaskProp) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: ITask) => {
    const payload = {
        ...data,
        id: randomID(),
        content: "",
        date: "",
        status: true
    };
    reset();
    setCards([...cards, payload]);
    setLocalStorage([...cards, payload] as any)
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="app__todo--content-form-add"
      >
        <div className="">
          <TextField
            autoComplete="false"
            {...register("name")}
            label="Name"
            id="outlined-size-small"
            size="small"
            color="warning"
            sx={{ width: "100%" }}
            autoFocus
            inputRef={(input) => input?.focus()}
          />

          {errors?.name && <span> {errors.name.message}</span>}
        </div>

        <div className="app__todo--content-form-add-btn">
          <Button type="submit" variant="contained">
            Add
          </Button>
          <CloseIcon onClick={() => closeForm('')} sx={{ color: "black", cursor: "pointer" }}  />
        </div>
      </form>
    </>
  );
}
