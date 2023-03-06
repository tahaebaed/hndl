import { gql } from '@apollo/client';

// vehicle
export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($deleteVehicleId: String!) {
    deleteVehicle(id: $deleteVehicleId) {
      _id
    }
  }
`;

// vehicle assignment
export const DELETE_VEHICLE_ASSIGNMENT = gql`
  mutation DeleteVehicleAssignment($deleteVehicleAssignmentId: String!) {
    deleteVehicleAssignment(id: $deleteVehicleAssignmentId) {
      _id
    }
  }
`;

// inspection
export const DELETE_INSPECTION = gql`
  mutation DeleteInspection($deleteInspectionId: String!) {
    deleteInspection(id: $deleteInspectionId) {
      _id
    }
  }
`;

// issue
export const DELETE_ISSUE = gql`
  mutation DeleteIssue($deleteIssueId: String!) {
    deleteIssue(id: $deleteIssueId) {
      _id
    }
  }
`;
// employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($deleteEmployeeId: String!) {
    deleteEmployee(id: $deleteEmployeeId) {
      _id
    }
  }
`;
// contact
export const DELETE_CONTACT = gql`
  mutation DeleteContact($deleteContactId: String!) {
    deleteContact(id: $deleteContactId) {
      _id
    }
  }
`;

// warehouse
export const DELETE_WAREHOUSE = gql`
  mutation DeleteWarehouse($deleteWarehouseId: String!) {
    deleteWarehouse(id: $deleteWarehouseId) {
      _id
    }
  }
`;

// fuel history
export const DELETE_FUEL_HISTORY = gql`
  mutation DeleteFuelHistory($deleteFuelHistoryId: String!) {
    deleteFuelHistory(id: $deleteFuelHistoryId) {
      _id
    }
  }
`;

// finance
export const DELETE_FINANCE = gql`
  mutation DeleteFinance($deleteFinanceId: String!) {
    deleteFinance(id: $deleteFinanceId) {
      _id
    }
  }
`;
