import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../../app/api/api";
import {
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../app/api/tasks/tasks.api";
import StatusSpan from "../../Common/Status/StatusSpan";
import { Status, Task } from "../../../app/api/tasks/types/task";

interface UpdatedTaskFormProps {
  setIsOpen: (isOpen: boolean) => void;
  task: Task;
}

const UpdatedTaskForm: FC<UpdatedTaskFormProps> = ({ setIsOpen, task }) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);

  const [editTask] = useUpdateTaskMutation();
  const [getTask] = useLazyGetTaskQuery();

  const [day, month, year] = task.endedDate.split(".");
  const [status, setStatus] = useState<Status>(task.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskRequest>({
    mode: "onChange",
    defaultValues: { ...task, endedDate: `${year}-${month}-${day}` },
  });

  const onSubmitTask: SubmitHandler<TaskRequest> = (data) => {
    editTask({ ...data, status: status })
      .unwrap()
      .then((_) => getTask(task.id));

    dispatch(
      api.util.invalidateTags([{ type: "Tasks", id: sectionName?.toString() }])
    );
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitTask)}>
      <p>Что нужно сделать?</p>
      <input
        {...register("text")}
        type="text"
        placeholder="(изначально пустое поле)"
      />
      {errors?.text && <div className="error">{errors.text.message}</div>}

      <p>На сколько срочно?</p>
      <ul>
        <li>
          <input
            {...register("status")}
            type="radio"
            name="status"
            id="cb"
            value="Urgent"
            checked={status === Status.Urgent}
          />
          <label htmlFor="cb" onClick={() => setStatus(Status.Urgent)}>
            <StatusSpan name="Срочно" />
          </label>
        </li>
        <li>
          <input
            {...register("status")}
            type="radio"
            name="status"
            id="cb"
            value="Middle"
            checked={status === Status.Middle}
          />
          <label htmlFor="cb" onClick={() => setStatus(Status.Middle)}>
            <StatusSpan name="Умеренно" />
          </label>
        </li>
        <li>
          <input
            {...register("status")}
            type="radio"
            name="status"
            id="cb"
            value="NotUrgent"
            checked={status === Status.NotUrgent}
          />
          <label htmlFor="cb" onClick={() => setStatus(Status.NotUrgent)}>
            <StatusSpan name="Не срочно" />
          </label>
        </li>
      </ul>

      <div>
        <p>Когда необходимо закончить?</p>
        <input
          {...register("endedDate")}
          type="date"
          placeholder="Название (изначально пустое поле)"
          style={{ width: "45%" }}
        />
        {errors?.endedDate && (
          <div className="error">{errors.endedDate.message}</div>
        )}
      </div>

      <button type="submit">Готово</button>
    </form>
  );
};

export default UpdatedTaskForm;
