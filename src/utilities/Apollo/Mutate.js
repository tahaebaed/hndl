import { gql } from '@apollo/client';

export const CREATE_VEHICLE = gql`
  mutation Mutation($vehicle: VehicleInput) {
    createVehicle(vehicle: $vehicle) {
      _id
      details {
        VIN
        licensePlate
        licenseRenewalDate
        make
        model
        name
        status
        type
        year
        group {
          _id
          createdAt
          name
        }
      }
    }
  }
`;
export const CREATE_VEHICLES = gql`
  mutation CreateVehicles($vehicles: [VehicleInput]) {
    createVehicles(vehicles: $vehicles) {
      _id
      details {
        VIN
        licensePlate
        licenseRenewalDate
        make
        model
        name
        status
        type
        year
        group {
          _id
          createdAt
          name
        }
      }
    }
  }
`;
export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($updateVehicleId: String!, $vehicle: NonStrictVehicleInput!) {
    updateVehicle(id: $updateVehicleId, vehicle: $vehicle) {
      _id
    }
  }
`;

// Vehicle assignment
export const CREATE_VEHICLE_ASSIGNMENTS = gql`
  mutation Mutation($vehicleAssignments: [VehicleAssignmentInput]) {
    createVehicleAssignments(vehicleAssignments: $vehicleAssignments) {
      _id
      vehicle {
        details {
          name
        }
      }
    }
  }
`;
export const UPDATE_VEHICLE_ASSIGNMENTS = gql`
  mutation UpdateVehicleAssignment(
    $updateVehicleAssignmentId: String!
    $vehicleAssignment: NonStrictVehicleAssignmentInput!
  ) {
    updateVehicleAssignment(id: $updateVehicleAssignmentId, vehicleAssignment: $vehicleAssignment) {
      _id
    }
  }
`;

// inspection mutation calls

export const CREATE_INSPECTION = gql`
  mutation Mutation($inspection: InspectionInput) {
    createInspection(inspection: $inspection) {
      assignTo {
        firstName
      }
      _id
      endTimestamp
      startTimestamp
      status
      inspectionForm {
        _id
        name
        tasks {
          documentUrl
          description
          comment
          name
          passed
          photoUrl
          text
          type
        }
      }
      vehicle {
        _id
        currentOdometerReading
        workingSeconds
        createdAt
        details {
          name
          year
          make
          model
          type
          photoUrl
          VIN
          licensePlate
          licenseRenewalDate
          licenseRenewalOffice
          status
          assignStatus
          initialOdometerReading
          initialWorkingSeconds
          color
        }
      }
    }
  }
`;
export const UPDATE_INSPECTION = gql`
  mutation UpdateInspection($updateInspectionId: String!, $inspection: NonStrictInspectionInput!) {
    updateInspection(id: $updateInspectionId, inspection: $inspection) {
      _id
    }
  }
`;

// INSPECTIONS Form
export const CREATE_INSPECTION_FORM = gql`
  mutation CreateInspectionForm($inspectionForm: InspectionFormInput) {
    createInspectionForm(inspectionForm: $inspectionForm) {
      _id
    }
  }
`;

export const UPDATE_TASKS_INSPECTIONS = gql`
  mutation UpdateInspection($updateInspectionId: String!, $inspection: NonStrictInspectionInput!) {
    updateInspection(id: $updateInspectionId, inspection: $inspection) {
      _id
    }
  }
`;

export const REPORT_INSPECTION_ISSUE = gql`
  mutation ReportInspectionIssues($reportInspectionIssuesId: String!, $reportedBy: String) {
    reportInspectionIssues(id: $reportInspectionIssuesId, reportedBy: $reportedBy) {
      _id
    }
  }
`;
//  Issue
export const CREATE_ISSUE = gql`
  mutation CreateIssue($issue: IssueInput) {
    createIssue(issue: $issue) {
      assignTo {
        _id
        firstName
        middleName
        lastName
        firstMobile
        secondMobile
        photoUrl
        email
        classification
        accessType
        jobTitle
        address
        city
        country
        birthdate
        nationalId
        employeeNumber
        licenseClass
        licenseRenewalDate
        createdAt
      }
      comment
      createdAt
      documentUrl
      endTimestamp
      name
      photoUrl
      reportedAt
      reportedBy {
        _id
        firstName
        middleName
        lastName
        firstMobile
        secondMobile
        photoUrl
        email
        classification
        accessType
        jobTitle
        address
        city
        country
        birthdate
        nationalId
        employeeNumber
        licenseClass
        licenseRenewalDate
        createdAt
      }
      status
      vehicle {
        _id
        details {
          name
        }
        currentOdometerReading
        workingSeconds
        createdAt
      }
    }
  }
`;
export const SET_ISSUE_EMERGENCE_TO_SERVICE = gql`
  mutation SetIssueEmergencyService($setIssueEmergencyServiceId: String!) {
    setIssueEmergencyService(id: $setIssueEmergencyServiceId) {
      _id
    }
  }
`;
export const UPDATE_ISSUE = gql`
  mutation UpdateIssue($updateIssueId: String!, $issue: NonStrictIssueInput!) {
    updateIssue(id: $updateIssueId, issue: $issue) {
      _id
    }
  }
`;
// contact mutate
export const CREATE_CONTACT = gql`
  mutation CreateContact($contact: ContactInput) {
    createContact(contact: $contact) {
      _id
      classification
      email
      firstAddress
      firstMobile
      name
      website
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($updateContactId: String!, $contact: NonStrictContactInput!) {
    updateContact(id: $updateContactId, contact: $contact) {
      _id
    }
  }
`;

export const UPDATE_CONTACT_MULTIPLE = gql`
  mutation CreateContacts($contacts: [ContactInput]) {
  createContacts(contacts: $contacts) {
    _id
  }
}
`;

// service
export const CREATE_SERVICE = gql`
  mutation CreateService($service: ServiceInput) {
    createService(service: $service) {
      _id
      assignTo {
        firstName
      }
      vehicle {
        _id
        details {
          name
        }
      }
      task
      status
      startTimestamp
      endTimestamp
      repairPriorityClass
    }
  }
`;
export const UPDATE_SERVICE = gql`
  mutation UpdateService($updateServiceId: String!, $service: NonStrictServiceInput!) {
    updateService(id: $updateServiceId, service: $service) {
      _id
      assignTo {
        firstName
      }
      vehicle {
        _id
        details {
          name
        }
      }
      task
      status
      startTimestamp
      endTimestamp
      repairPriorityClass
    }
  }
`;
export const DELETE_SERVICE = gql`
  mutation DeleteService($deleteServiceId: String!) {
    deleteService(id: $deleteServiceId) {
      _id
    }
  }
`;
export const CREATE_SERVICE_PROGRAM = gql`
  mutation CreateServiceProgram($serviceProgram: ServiceProgramInput) {
    createServiceProgram(serviceProgram: $serviceProgram) {
      _id
      name
      createdAt
      relatedGroups {
        _id
        name
        createdAt
      }
      relatedTo
      relatedVehiclesTypes
      tasks {
        name
        description
        workingHoursInterval
        workingHoursIntervalDueSoonThreshold
        distanceInterval
        distanceIntervalDueSoonThreshold
        timeInterval {
          value
          unit
        }
        timeIntervalDueSoonThreshold {
          value
          unit
        }
      }
    }
  }
`;
export const UPDATE_SERVICE_PROGRAM = gql`
  mutation UpdateServiceProgram(
    $updateServiceProgramId: String!
    $serviceProgram: NonStrictServiceProgramInput!
  ) {
    updateServiceProgram(id: $updateServiceProgramId, serviceProgram: $serviceProgram) {
      _id
      name
      tasks {
        name
        description
        workingHoursInterval
        workingHoursIntervalDueSoonThreshold
        distanceInterval
        distanceIntervalDueSoonThreshold
        timeInterval {
          value
          unit
        }
        timeIntervalDueSoonThreshold {
          unit
          value
        }
      }
      relatedTo
      relatedGroups {
        _id
        name
        createdAt
      }
      relatedVehiclesTypes
      createdAt
    }
  }
`;
export const DELETE_SERVICE_PROGRAM = gql`
  mutation DeleteServiceProgram($deleteServiceProgramId: String!) {
    deleteServiceProgram(id: $deleteServiceProgramId) {
      _id
      name
      tasks {
        name
        description
        workingHoursInterval
        workingHoursIntervalDueSoonThreshold
        distanceInterval
        distanceIntervalDueSoonThreshold
        timeInterval {
          value
          unit
        }
        timeIntervalDueSoonThreshold {
          value
          unit
        }
      }
      relatedTo
      relatedGroups {
        _id
        name
        createdAt
      }
      relatedVehiclesTypes
      createdAt
    }
  }
`;
// add employee
export const ADD_EMPLOYEE = gql`
  mutation CreateEmployee($employee: EmployeeInput) {
    createEmployee(employee: $employee) {
      _id
    }
  }
`;
// add employee
export const ADD_EMPLOYEES = gql`
  mutation CreateEmployees($employees: [EmployeeInput]) {
    createEmployees(employees: $employees) {
      _id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($updateEmployeeId: String!, $employee: NonStrictEmployeeInput!) {
    updateEmployee(id: $updateEmployeeId, employee: $employee) {
      _id
    }
  }
`;

// warehouse
export const CREATE_WARE_HOUSE = gql`
  mutation CreateWarehouse($warehouse: WarehouseInput) {
    createWarehouse(warehouse: $warehouse) {
      _id
    }
  }
`;

export const UPDATE_WAREHOUSE = gql`
  mutation UpdateWarehouse($updateWarehouseId: String!, $warehouse: NonStrictWarehouseInput!) {
    updateWarehouse(id: $updateWarehouseId, warehouse: $warehouse) {
      _id
    }
  }
`;

export const CREATE_MULTIPLE_WAREHOUSE = gql`
  mutation CreateWarehouses($warehouses: [WarehouseInput]) {
    createWarehouses(warehouses: $warehouses) {
      _id
    }
}
`;

// fuel history
export const CREATE_FUEL_HISTORY = gql`
  mutation CreateFuelHistory($fuelHistory: FuelHistoryInput) {
    createFuelHistory(fuelHistory: $fuelHistory) {
      _id
    }
  }
`;

export const UPDATE_FUEL_HISTORY = gql`
  mutation UpdateFuelHistory($updateFuelHistoryId: String!, $fuelHistory: FuelHistoryInput!) {
    updateFuelHistory(id: $updateFuelHistoryId, fuelHistory: $fuelHistory) {
      _id
    }
  }
`;

// finance
export const ADD_EXPENSE = gql`
  mutation CreateExpense($vehicle: String!, $expense: FinanceExpenseInput!) {
    createExpense(vehicle: $vehicle, expense: $expense) {
      _id
    }
  }
`;

// edit expenses

export const UPDATE_EXPENSES_HISTORY = gql`
  mutation UpdateFinance($updateFinanceId: String!, $finance: NonStrictFinanceInput!) {
    updateFinance(id: $updateFinanceId, finance: $finance) {
      _id
    }
  }
`;
