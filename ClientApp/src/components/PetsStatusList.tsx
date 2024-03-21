import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { ApplicationState } from "../store";
import { actionCreators, PetsStatus } from "../store/PetsStatus";

const mapState = (state: ApplicationState) => ({
  petsStatus: state.petsStatus,
});

const connector = connect(mapState, actionCreators);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PetsStatusProps = PropsFromRedux &
  RouteComponentProps<{ startDateIndex: string }>;

export const FetchPetsStatus = (props: PetsStatusProps) => {
  useEffect(() => {
    const startDateIndex = parseInt(props.match.params.startDateIndex, 10) || 0;
    props.requestPetsStatus(startDateIndex);
  }, [props.match.params.startDateIndex]);

  const renderForecastsTable = () => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Kind</th>
            <th>Name</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {props.petsStatus &&
            props.petsStatus.statusList.map((petStatus: PetsStatus) => (
              <tr key={petStatus.date}>
                <td>{petStatus.date}</td>
                <td>{petStatus.animalKind}</td>
                <td>{petStatus.name}</td>
                <td>{petStatus.temperature}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const renderPagination = () => {
    const prevStartDateIndex =
      (parseInt(props.match.params.startDateIndex) || 0) - 5;
    const nextStartDateIndex =
      (parseInt(props.match.params.startDateIndex) || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link
          className="btn btn-outline-secondary btn-sm"
          to={`/fetch-pets-status-data/${prevStartDateIndex}`}
        >
          Previous
        </Link>
        {props.petsStatus && props.petsStatus.isLoading && (
          <span>Loading...</span>
        )}
        <Link
          className="btn btn-outline-secondary btn-sm"
          to={`/fetch-pets-status-data/${nextStartDateIndex}`}
        >
          Next
        </Link>
      </div>
    );
  };

  return (
    <>
      <h1 id="tableLabel">Pets Status</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet libero
        sint voluptas possimus voluptate eveniet dolor non sed incidunt!
        Adipisci quas ducimus esse nisi! Exercitationem tenetur eius non sed
        qui.
      </p>
      {renderForecastsTable()}
      {renderPagination()}
    </>
  );
};

export default connector(FetchPetsStatus);
