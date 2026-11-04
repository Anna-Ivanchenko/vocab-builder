import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStatistics } from "../../redux/words/operations";
import { resetFilters } from "../../redux/words/slice";
import { selectTotalCount } from "../../redux/words/selectors";
import Filters from "../Filters/Filters";
import Icon from "../Icon/Icon";
import css from "./Dashboard.module.css";

interface DashboardProps {
  onAddWord?: () => void;
}

const Dashboard = ({ onAddWord }: DashboardProps) => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectTotalCount);

  useEffect(() => {
    dispatch(fetchStatistics());

    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  return (
    <div className={css.dashboard}>
      <Filters />

      <div className={css.panel}>
        <p className={css.study}>
          To study: <span className={css.count}>{totalCount}</span>
        </p>

        <div className={css.actions}>
          {onAddWord && (
            <button type="button" className={css.action} onClick={onAddWord}>
              Add word
              <Icon id="plus" className={css.icon} />
            </button>
          )}
          <Link to="/training" className={css.action}>
            Train oneself
            <Icon id="right-horizontal" className={css.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
