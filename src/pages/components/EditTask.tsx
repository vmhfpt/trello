import {
    Box,
    Button,
    Modal,
    TextField,
    TextareaAutosize,
    Tooltip,
  } from "@mui/material";

import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import {ITask} from "../../interface/task.interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
const schem = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required(),
    id: Joi.allow(),
    date: Joi.date().required(),
    status: Joi.allow(),
    selected : Joi.allow(),
    chosen : Joi.allow()
});

interface IEditTask {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
    id : number;
    cards : ITask[];
    setCards : Dispatch<SetStateAction<ITask[]>>;
    setLocalStorage : Dispatch<SetStateAction<any>>,
    type : string
}

export default function EditTask({open , setOpen, id, cards, setCards, setLocalStorage, type} : IEditTask){
    const [dataEdit, setDataEdit] = useState<ITask>()
    
    
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ITask>({
        resolver: joiResolver(schem),
      });

    useEffect(() => {
      const [filter] = cards?.filter(item => item.id == id);
      setDataEdit(filter);
      if(filter){
       
        let dateString = filter.date;
        let date = new Date(dateString);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        let formattedDate = `${year}-${month}-${day}`;
        reset({
            ...filter,
            date : formattedDate
        })
      }
    }, [open, id, dataEdit])


    const onSubmit = (data : ITask) => {
        const newDate = data.date;
       
    
        const payload = {
          ...data,
          date: String(newDate),
        };
        const newCards = cards.map((item) => {
            if(item.id == payload.id){
                return payload;
            }else {
                return item;
            }
        })
        setCards(newCards)
        setLocalStorage(newCards)
        setOpen(false);
       
    }
 

    return ( <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="app__popup--container">
          <h1>
            Edit task {dataEdit?.name} - <span>{type}</span>
          </h1>
          <div className="app__popup--content">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="app__popup--content-form"
            >
              <div className="app__popup--content-form-item">
                <TextField
                  {...register("name")}
                  label="Name"
                  size="small"
                  color="warning"
                  sx={{ width: "100%" }}
                />
                {errors?.name && (
                  <span>{errors?.name?.message}</span>
                )}
              </div>
              <div className="app__popup--content-form-item">
                <TextareaAutosize
                  {...register("content")}
                  minRows={3}
                  placeholder="Content"
                />
                {errors?.content && (
                  <span>{errors?.content?.message}</span>
                )}
              </div>

              <div className="app__popup--content-form-item">
                <input type="date" {...register("date")} />
                {errors?.date && (
                  <span>{errors?.date?.message}</span>
                )}
              </div>
             
              <div className="app__popup--content-form-item">
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>)
}