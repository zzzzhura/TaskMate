import { SubmitHandler, useForm } from "react-hook-form";
import StatusSpan from "../../Common/Status/StatusSpan";
import { useCreateTaskMutation } from "../../../app/api/tasks/tasks.api";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { api } from "../../../app/api/api";
import { Status } from "../../../app/api/tasks/types/task";

interface CreatedTaskFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const CreatedTaskForm: FC<CreatedTaskFormProps> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);

  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskRequest>({
    mode: "onChange",
  });

  const onSubmitTask: SubmitHandler<TaskRequest> = (data) => {
    createTask({...data, status: status});
    dispatch(
      api.util.invalidateTags([{ type: "Tasks", id: sectionName?.toString() }])
    );
    setIsOpen(false);
  };

  const [status, setStatus] = useState<Status>(Status.Urgent);

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

export default CreatedTaskForm;
