import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTasks } from "../../redux/training/operations";
import { resetTraining } from "../../redux/training/slice";
import { useNavigate } from "react-router-dom";
import { selectResults, selectTasks } from "../../redux/training/selectors";
import Loader from "../../components/Loader/Loader";
import TrainingEmpty from "../../components/TrainingEmpty/TrainingEmpty";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import WellDoneModal from "../../components/WellDoneModal/WellDoneModal";

const TrainingPage = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const [isReady, setIsReady] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const navigate = useNavigate();
  const results = useAppSelector(selectResults);

  useEffect(() => {
    dispatch(fetchTasks()).finally(() => setIsReady(true));

    return () => {
      dispatch(resetTraining());
    };
  }, [dispatch]);

  if (!isReady) return <Loader />;

  return (
    <div className="container">
      {tasks.length === 0 ? (
        <TrainingEmpty onAddWord={() => setIsAddOpen(true)} />
      ) : (
        <TrainingRoom tasks={tasks} onSaved={() => setIsResultsOpen(true)} />
      )}
      {isAddOpen && (
        <AddWordModal
          onClose={() => setIsAddOpen(false)}
          onSuccess={() => dispatch(fetchTasks())}
        />
      )}
      {isResultsOpen && (
        <WellDoneModal
          results={results}
          onClose={() => navigate("/dictionary")}
        />
      )}{" "}
    </div>
  );
};

export default TrainingPage;
