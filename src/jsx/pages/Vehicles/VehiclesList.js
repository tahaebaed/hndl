/**
 * @description
 *    this component for display the vehicles list data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_VEHICLES as the query type to fetch the data
 *        - columns: the columns array to display and filter table columns data
 *        - fileName: passing the file name that will be exported/download as excel sheet
 *        - sheetName:  passing the sheet name that will be exported/download in the file
 *        - tableRef:  passing the useRef() element to watch on the table
 */

// packages imports
import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

// local and components import
import AddButtons from '../../components/buttons/AddButtons';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { COLUMNS } from '../../components/table/FilteringTable/Columns';
import { GET_VEHICLES } from '../../../utilities/Apollo/Querries';
import StepperWrapper from '../../components/stepper/Stepper';
import DownloadExcel from '../../components/importExportExcel/DownloadExcel';
import TableExcel from '../../components/importExportExcel/TableExcel';
import { Modal, ModalBody } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ModalFormControl from '../../components/modalsWrapper/ModalFormControl';
import Edit from '../../components/reusableEdit/Edit';
import { CREATE_VEHICLE, CREATE_VEHICLES } from '../../../utilities/Apollo/Mutate';
import EditVehicle from '../../components/reusableEdit/editablecomp/EditVehicle';
import Loader from '../../../utilities/Loader';
import EditStepperWrapper from '../../components/reusableEdit/editablecomp/EditVehicleScreen/EditStepperWrapper';

const VehiclesList = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [localVehicleList, setlocalVehicleList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const [active, setActive] = useState(null);
  const {
    data: vehicleList,
    loading,
    error,
    refetch,
  } = useQuery(GET_VEHICLES, {
    variables: {
      filter: null,
      options: { showAll: true },
    },
    onCompleted: (data) => {
      setlocalVehicleList(data.getVehicles.data);
    },
  });
  const [createVehicles] = useMutation(CREATE_VEHICLES);

  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [ID, setID] = useState(false);

  const intl = useIntl();
  const history = useHistory();

  const tableRef = useRef(null);
  const tableRefMulti = useRef(null);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);

  const convertExcelDataToNeededArray = (Arr) => {
    const CONVERTED = Arr.map((col) => ({
      currentOdometerReading: 0,
      maintenance: {
        serviceProgram: null,
      },
      specifications: {
        dimensions: {
          bedLength: 0,
          cargoVolume: 0,
          groundClearance: 0,
          height: 0,
          interiorVolume: 0,
          length: 0,
          passengerVolume: 0,
          width: 0,
        },
        engine: {
          aspiration: '',
          blockType: '',
          bore: 0,
          camType: '',
          compressionRatio: 0,
          engineBrand: '',
          fuelInduction: '',
          maxHP: 0,
          maxTorque: 0,
          numberOfCylinders: 0,
          numberOfValves: 0,
          redlineRPM: 0,
          stroke: 0,
          totalDisplacement: 0,
        },
        oils: {
          fuelConsumption: 0,
          fuelConsumptionCounterfeitRange: 0,
          fuelPrimaryTankCapacity: 0,
          fuelConsumptionSuspiciousRange: 0,
          fuelQuality: '',
          fuelType: 'Gasoline_80',
          fuelSecondaryTankCapacity: 0,
          oilCapacity: 0,
          oilType: '',
        },
        transmission: {
          numberOfGears: 0,
          transmissionBrand: '',
          transmissionType: '',
        },
        weights: {
          curbWeight: 0,
          grossVehicleWeight: 0,
          maxPayload: 0,
          towingCapacity: 0,
        },
        wheels: {
          brakeSystemType: '',
          driveType: '',
          frontTirePressure: 0,
          frontTireType: '',
          frontTrackWidth: 0,
          frontWheelDiameter: 0,
          rearAxle: 0,
          rearTirePressure: 0,
          rearTireType: '',
          rearTrackWidth: 0,
          rearWheelDiameter: 0,
          wheelBase: 0,
        },
      },

      details: {
        VIN: col['VIN'],
        color: '#000',
        group: col['Group'],
        initialOdometerReading: 0,
        licensePlate: `${col['License Plate']}`,
        licenseRenewalDate: col['License Renewal Date'],
        licenseRenewalOffice: 'Cairo',
        make: '123',
        model: `${col['Model']}`,
        name: col['Name'],
        photoUrl: '',
        status: col['Status'],
        type: col['Type'],
        year: `${col['Year']}`,
      },
    }));
    createVehicles({
      variables: {
        vehicles: CONVERTED,
      },
      refetchQueries: [{
        query: GET_VEHICLES,
        variables: {
          options: {
            showAll: true,
          },
        },
      }],
    });
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>error {error.message}</p>;
  }
  return (
    <>
      <div className='container'>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.vehicles_list}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-between`}>
            <AddButtons
              col='col-5'
              addButton={intl.messages.add_vehicle_button}
              setOpenModal={setOpenModal}
              openModal={openModal}
            >
              <StepperWrapper
                refetchQuery={GET_VEHICLES}
                vehicleList={localVehicleList}
                setlocalVehiclesList={setlocalVehicleList}
                setOpenModal={setOpenModal}
              />
            </AddButtons>

            <AddButtons
              col='col-6'
              outLine={'btn-outline-primary'}
              addButton={intl.messages.add_multiple_button}
              setOpenModal={setOpenModall}
              openModal={openModall}
            >
              <DownloadExcel
                tableRefMulti={tableRefMulti}
                convert={convertExcelDataToNeededArray}
                fileName={'vehicle'}
                sheetName={`vehicle`}
              />
            </AddButtons>
          </div>
        </div>
        <ul className='d-flex'>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === null ? 'active' : ''}`}
              onClick={() => {
                setActive(null);
                refetch({ filter: null });
              }}
            >
              {intl.messages.all_button}
            </button>
          </li>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === 'assigned' ? 'active' : ''}`}
              onClick={() => {
                setActive('assigned');
                refetch({
                  filter: {
                    details: {
                      assignStatus: 'Assigned',
                    },
                  },
                });
              }}
            >
              {intl.messages.assigned_button}
            </button>
          </li>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === 'unassigned' ? 'active' : ''}`}
              onClick={() => {
                setActive('unassigned');
                refetch({
                  filter: {
                    details: {
                      assignStatus: 'Unassigned',
                    },
                  },
                });
              }}
            >
              {intl.messages.unassigned_button}
            </button>
          </li>
        </ul>
        <TableExcel columns={columns} tableRefMulti={tableRefMulti} />
        {vehicleList && (
          <ReusableTable
            tableRef={tableRef}
            data={localVehicleList}
            columns={columns}
            setId={setID}
            setModal={setOpenVehicleModal}
            fileName='Vehicle List'
            sheetName='vehicles'
          />
        )}

        <Edit
          buttonTitle='Edit Vehicle List'
          setModal={setOpenVehicleModal}
          modal={openVehicleModal}
        >
          <EditStepperWrapper
            setModal={setOpenVehicleModal}
            compData={localVehicleList}
            setlocalVehicleList={setlocalVehicleList}
            refetchQuery={GET_VEHICLES}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default VehiclesList;
