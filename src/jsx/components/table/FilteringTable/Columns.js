import { useLazyQuery, useQuery } from '@apollo/client';
import { type } from '@testing-library/user-event/dist/type';
import { format } from 'date-fns';
import { GET_SERVICE } from '../../../../utilities/Apollo/Querries';
import Service from '../../../pages/Service/serviceItem/Service';
import AddButtons from '../../buttons/AddButtons';
import { ColumnFilter } from './ColumnFilter';
import ReportInspectionIssue from '../../../pages/Inspection/add_inspection/ReportInspectionIssue';
import IssueToService from '../../../pages/Issues/IssueToService';
export const COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Year',
    Footer: 'Year',
    accessor: 'details.year',
    Filter: ColumnFilter,
  },
  {
    Header: 'Model',
    Footer: 'Model',
    accessor: 'details.model',
    Filter: ColumnFilter,
  },
  {
    Header: 'Type',
    Footer: 'Type',
    accessor: 'details.type',
    Filter: ColumnFilter,
  },
  {
    Header: 'VIN',
    Footer: 'VIN',
    accessor: 'details.VIN',
    Filter: ColumnFilter,
  },
  {
    Header: 'License Plate',
    Footer: 'License Plate',
    accessor: 'details.licensePlate',
    Filter: ColumnFilter,
  },
  {
    Header: 'License Renewal Date',
    Footer: 'License Renewal Date',
    accessor: 'details.licenseRenewalDate',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Group',
    Footer: 'Group',
    accessor: 'details.group.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'details.status',
    Filter: ColumnFilter,
  },
  {
    Header: 'Current Meter',
    Footer: 'Current Meter',
    accessor: 'currentOdometerReading',
    Filter: ColumnFilter,
  },
];
export const COLUMNS_ASSIGNMENTS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Operator',
    Footer: 'Operator',
    accessor: 'operator.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Start Date',
    Footer: 'Start Date',
    accessor: 'startTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'End Date',
    Footer: 'End Date',
    accessor: 'expireAt',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
];
export const INSPECTION_COLUMNS = [
  {
    Header: 'Vehicle Name',
    Footer: 'Vehicle Name',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Form Name',
    Footer: 'Form Name',
    accessor: 'inspectionForm.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status',
    Filter: ColumnFilter,
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value}

          <div
            className={`ml-2 ${value === 'Resolved' || value === 'Open' || value === 'Overdue' || value === 'Submitted'
                ? `${value}_issue`
                : ''
              }`}
          />
        </div>
      );
    },
  },
  {
    Header: 'Assigned to',
    Footer: 'Assigned to',
    accessor: 'assignTo.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Start Date',
    Footer: 'Start Date',
    accessor: 'startTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'End Date',
    Footer: 'End Date',
    accessor: 'endTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
];

export const ISSUES_COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status',
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value}

          <div
            className={`ml-2 ${value === 'Resolved' || value === 'Open' || value === 'Overdue'
                ? `${value}_issue`
                : ''
              }`}
          />
        </div>
      );
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Issue',
    Footer: 'Issue',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Assigned to',
    Footer: 'Assigned to',
    accessor: 'assignTo.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Reported at',
    Footer: 'Reported at',
    accessor: 'reportedAt',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Reported By',
    Footer: 'Reported By',
    accessor: 'reportedBy.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Add To Service',
    Footer: 'Add To Service',
    accessor: '_id',
    Cell: ({ value }) => {
      return <IssueToService id={value} />;
    },
    Filter: ColumnFilter,
  },
  // missing column add service
];
export const EXPENSES_COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Service',
    Footer: 'Service',
    accessor: 'servicesTotalCost',
    Filter: ColumnFilter,
  },
  {
    Header: 'Issue',
    Footer: 'Issue',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Fuel',
    Footer: 'Fuel',
    accessor: 'fuelTotalCost',
    Filter: ColumnFilter,
  },
  {
    Header: 'Others',
    Footer: 'Others',
    accessor: 'othersTotalCost',
    Filter: ColumnFilter,
  },
  // {
  //   Header: 'Total Cost',
  //   Footer: 'Total Cost',
  //   accessor: 'expenses.cost',
  //   Filter: ColumnFilter,
  // },
  // missing column add service
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of  Birth',
        Footer: 'Date of  Birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
];

export const COLUMNS_SERVICE_LIST = [
  {
    Header: 'vehicle',
    Footer: 'vehicle',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'status',
    Footer: 'status',
    accessor: 'status',
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value}

          <div
            className={`ml-2 ${value === 'Resolved' || value === 'Open' || value === 'Overdue'
                ? `${value}_issue`
                : ''
              }`}
          />
        </div>
      );
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Repair Priority',
    Footer: 'Repair Priority',
    accessor: 'repairPriorityClass',
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value.replace('_', ' ')}

          <div
            className={`ml-2 ${value === 'Scheduled' ? `Resolved_issue` : ''} ${value === 'Non_Scheduled' ? 'Open_issue' : ''
              }
              ${value === 'Emergency' ? 'Overdue_issue' : ''}
            `}
          />
        </div>
      );
    },
    Filter: ColumnFilter,
  },

  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'assignTo.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Task',
    Footer: 'Task',
    accessor: 'task',
    Filter: ColumnFilter,
  },
  {
    Header: 'Start Date',
    Footer: 'Start Date',
    accessor: 'startTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'End Date',
    Footer: 'End Date',
    accessor: 'endTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
];

export const COLUMNS_SERVICE_HISTORY = [
  {
    Header: 'vehicle',
    Footer: 'vehicle',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'assignTo.firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Task',
    Footer: 'Task',
    accessor: 'task',
    Filter: ColumnFilter,
  },
  {
    Header: 'Repair Priority',
    Footer: 'Repair Priority',
    accessor: 'repairPriorityClass',
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value.replace('_', ' ')}

          <div
            className={`ml-2 ${value === 'Scheduled' ? `Resolved_issue` : ''} ${value === 'Non_Scheduled' ? 'Open_issue' : ''
              }
              ${value === 'Emergency' ? 'Overdue_issue' : ''}
            `}
          />
        </div>
      );
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'status',
    Footer: 'status',
    accessor: 'status',
    Cell: ({ value }) => {
      return (
        <div className='align-items-center d-flex'>
          {value}
          <div
            className={`ml-2 ${value === 'Resolved' || value === 'Open' || value === 'Overdue'
                ? `${value}_issue`
                : value === 'Completed'
                ? 'Resolved_issue'
                : ''
              }`}
          />
        </div>
      );
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Start Date',
    Footer: 'Start Date',
    accessor: 'startTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'End Date',
    Footer: 'End Date',
    accessor: 'endTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
];
export const MAP_VEHICLE_TABLE = [
  {
    Header: 'vehicle',
    Footer: 'vehicle',
    accessor: 'details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'details.status',
    Filter: ColumnFilter,
  },
];

export const EMPLOYEES_COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'firstName',
    Filter: ColumnFilter,
  },
  {
    Header: 'Group',
    Footer: 'Group',
    accessor: 'group.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Mail',
    Footer: 'Mail',
    accessor: 'email',
    Filter: ColumnFilter,
  },
  {
    Header: 'Classification',
    Footer: 'Classification',
    accessor: 'classification',
    Filter: ColumnFilter,
  },
  {
    Header: 'Access Type',
    Footer: 'Access Type',
    accessor: 'accessType',
    Filter: ColumnFilter,
  },
  {
    Header: 'Assigned Vehicles',
    Footer: 'Assigned Vehicles',
    accessor: 'assignedVehicles[0].details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'License Renewal Date',
    Footer: 'License Renewal Date',
    accessor: 'licenseRenewalDate',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'End Date',
    Footer: 'End Date',
    accessor: 'endTimestamp',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
];

export const CONTACT_COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Mobile',
    Footer: 'Mobile',
    accessor: 'firstMobile',
    Filter: ColumnFilter,
  },
  {
    Header: 'Mail',
    Footer: 'Mail',
    accessor: 'email',
    Filter: ColumnFilter,
  },
  {
    Header: 'Classification',
    Footer: 'Classification',
    accessor: 'classification',
    Filter: ColumnFilter,
  },
  {
    Header: 'Address',
    Footer: 'Address',
    accessor: 'firstAddress',
    Filter: ColumnFilter,
  },
  {
    Header: 'Website',
    Footer: 'Website',
    accessor: 'website',
    Filter: ColumnFilter,
  },
];

export const WAREHOUSE_COLUMNS_MULTIPLE = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Manufacturer',
    Footer: 'Manufacturer',
    accessor: 'manufacturer.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Item Number',
    Footer: 'Item Number',
    accessor: 'itemNumber',
    Filter: ColumnFilter,
  },
  {
    Header: 'Category',
    Footer: 'Category',
    accessor: 'category',
    Filter: ColumnFilter,
  },
  {
    Header: 'Part Type',
    Footer: 'Part Type',
    accessor: 'partType',
    Filter: ColumnFilter,
  },
];

export const WAREHOUSE_COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Manufacturer',
    Footer: 'Manufacturer',
    accessor: 'manufacturer.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Item Number',
    Footer: 'Item Number',
    accessor: 'itemNumber',
    Filter: ColumnFilter,
  },
  {
    Header: 'Category',
    Footer: 'Category',
    accessor: 'category',
    Filter: ColumnFilter,
  },
  {
    Header: 'Quantity',
    Footer: 'Quantity',
    accessor: 'totalQuantity',
    Filter: ColumnFilter,
  },
  {
    Header: 'Avg Cost',
    Footer: 'Avg Cost',
    accessor: 'avgCost',
    Filter: ColumnFilter,
  },
];

export const FUEL_HISTORY_COLUMNS = [
  {
    Header: 'Vehicle',
    Footer: 'Vehicle',
    accessor: 'vehicle.details.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'License Plate',
    Footer: 'License Plate',
    accessor: 'vehicle.details.licensePlate',
    Filter: ColumnFilter,
  },
  {
    Header: 'Receipt Date',
    Footer: 'Receipt Date',
    accessor: 'receiptDate',
    Cell: ({ value }) => {
      return value !== 'null'
        ? new Date(value).toLocaleString('en-GB').split(',')[0]
        : '--/--/----';
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'Odometer Reading',
    Footer: 'Odometer Reading',
    accessor: 'odometerReading',
    Filter: ColumnFilter,
  },
  {
    Header: 'Vendor',
    Footer: 'Vendor',
    accessor: 'vendor.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Traveled Distance',
    Footer: 'Traveled Distance',
    accessor: 'traveledDistance',
    Filter: ColumnFilter,
  },
  {
    Header: 'Fuel Cost',
    Footer: 'Fuel Cost',
    accessor: 'fuelCost',
    Filter: ColumnFilter,
  },
  {
    Header: 'Fuel Total Cost',
    Footer: 'Fuel Total Cost',
    accessor: 'fuelTotalCost',
    Filter: ColumnFilter,
  },
  {
    Header: 'Traveled Distance F/C',
    Footer: 'Traveled Distance F/C',
    accessor: 'fuelCostPerTraveledDistanceUnit',
    Filter: ColumnFilter,
  },
  {
    Header: 'Fuel Consumption Rate',
    Footer: 'Fuel Consumption Rate',
    accessor: 'fuelConsumptionRate',
    Filter: ColumnFilter,
  },
];
