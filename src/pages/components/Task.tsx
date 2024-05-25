import { useEffect, useState } from "react";

import { ReactSortable } from "react-sortablejs";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import UDialog from "../../util/Dialog";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import {ITask} from "../../interface/task.interface";
import { Dispatch, SetStateAction } from 'react';
interface ITaskProps {
	title: string;
	formShow : string;
	setFormShow :  Dispatch<SetStateAction<string>>;
}



export default function Task({ title, formShow , setFormShow} : ITaskProps) {
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const [idDelete, setIdDelete] = useState<number>(0);
    const [id, setId] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);
    const [listTasks, setLocalStorage] = useLocalStorage<ITask[]>(title, [] as ITask[]);
    
    const [cards, setCards] = useState<ITask[]>([]);
    
	
    const handleSetList = (old : ITask[]) => {
		
        setCards(old);
        if(old.length > 0){
            setLocalStorage(old as ITask[])
        }else if(old.length == 0 && cards.length == 1){
            setLocalStorage([] as ITask[])
        }

    }

    useEffect(() => {
        setCards(listTasks as ITask[])
    }, [])

	const handleEdit = (id : number) => {
		setId(id);
		setOpen(true);
	}

	const handleCofirm = () => {
      const newArr = cards.filter(item => item.id != idDelete);
	  setCards(newArr)
	  setLocalStorage(newArr as ITask[]);
	  setOpenConfirm(false);
	}
    const handleDeleteTask = (id : number) => {
		setOpenConfirm(true);
		setIdDelete(id);
		
	}
	return (
		<>
		<UDialog 
		  openConfirm={openConfirm}
		  setOpenConfirm={setOpenConfirm}
		  handleCofirm={handleCofirm}
		/>
        <EditTask 
		   open={open} 
		   setOpen={setOpen}
		   id={id}
		   cards={cards}
		   setCards={setCards}
		   setLocalStorage={setLocalStorage}
		   type={title}
		/>


		<div className="col-sm-4">
              <div className="app__todo">
                <div className="app__todo--title">
                  <h1> {title}</h1>
                </div>
                <div className="app__todo--content">
                <ReactSortable
					group="shared"
					animation={200}
					delay={1}
					swap
					multiDrag
					setList={(old) => handleSetList(old)}
					list={cards}
				>
					{cards.map((card: ITask) => (
						<div
						
						key={card.id}
						
						className="app__todo--content-item"
					  >
						<div>
						  <span>{card.name}</span>
						</div>
						<div  className="app__todo--content-item-icon">
						  <Tooltip  onClick={() => handleEdit(card.id)}  title="Edit">
							<EditNoteIcon />
						  </Tooltip>


						  <Tooltip onClick={() => handleDeleteTask(card.id)}  title="Delete" >
							<DeleteIcon  sx={{color : 'red'}} />
						  </Tooltip>


						</div>
					  </div>
					))}
				</ReactSortable>
                </div>

                <div className="app__todo--content-form">
                  {formShow != title && (
                    <div
                      onClick={() => setFormShow(title)}
                      className="app__todo--content-form-btn"
                    >
                      <AddIcon />
                      <span> Add a Card</span>
                    </div>
                  )}

                  {formShow == title && (
                    <div className="app__todo--content-form-btns">
                       <AddTask closeForm={setFormShow} setCards={setCards}  setLocalStorage={setLocalStorage} cards={cards} />
                    </div>
                  )}
                </div>
              </div>
            </div>
		</>
	);
};


