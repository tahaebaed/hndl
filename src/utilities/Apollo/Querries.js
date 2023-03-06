import { gql } from '@apollo/client';

// https://www.apollographql.com/docs/react/data/queries

export const GET_SIGNED_URL = gql`
  query GetWriteSignedURL($fileName: String!, $contentType: String!) {
    getWriteSignedURL(fileName: $fileName, contentType: $contentType) {
      signedUrl
      fileName
      contentType
    }
  }
`;

export const AUTHENTICATE_EMPLOYEE = gql`
  query AuthenticateEmployee($email: String!, $password: String!) {
    authenticateEmployee(email: $email, password: $password) {
      employee {
        classification
        firstName
        accessType
        _id
      }
      token
    }
  }
`;

export const GET_DASHBOARD = gql`
  query GetDashboard {
    getDashboard {
      serviceStatus {
        Open
        Completed
        Overdue
      }
      inspectionsStatus {
        Open
        Overdue
        Scheduled
        Submitted
        Submitted_With_failure
      }
      issuesStatus {
        Open
        Overdue
        Resolved
      }
      vehiclesStatus {
        Active
        Inactive
        In_Shop
        Out_Of_Service
      }
      vehiclesAssignments {
        Assigned
        Unassigned
      }
      vehiclesLicenseRenewalReminders {
        overdue
        dueSoon
      }
      operatorLicenseRenewalReminders {
        overdue
        dueSoon
      }
      totalCosts {
        january
        february
        march
        april
        may
        june
        july
        august
        september
        october
        november
        december
      }
      serviceCosts {
        january
        february
        march
        april
        may
        june
        july
        august
        september
        october
        november
        december
      }
      fuelCosts {
        january
        february
        march
        april
        may
        june
        july
        august
        september
        october
        november
        december
      }
      otherCosts {
        january
        february
        march
        april
        may
        june
        july
        august
        september
        october
        november
        december
      }
      fuelCostPerTraveledDistanceUnit {
        january
        february
        march
        april
        may
        june
        july
        august
        september
        october
        november
        december
      }
    }
  }
`;

export const GET_VEHICLES = gql`
  query GetVehicles($options: ListOptionsInput, $filter: NonStrictVehicleInput) {
    getVehicles(options: $options, filter: $filter) {
      data {
        _id
        currentOdometerReading
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
  }
`;

export const GET_VEHICLE = gql`
  query GetVehicle($getVehicleId: String!) {
    getVehicle(id: $getVehicleId) {
      currentOdometerReading
      details {
        VIN
        assignStatus
        color
        group {
          name
          _id
        }
        initialOdometerReading
        initialWorkingSeconds
        licensePlate
        licenseRenewalDate
        licenseRenewalOffice
        make
        model
        name
        photoUrl
        status
        type
        year
      }
      currentOdometerReading
      maintenance {
        serviceProgram {
          _id
        }
      }
      gps {
        device
        serialNumber
        timeInterval
      }
      specifications {
        dimensions {
          bedLength
          cargoVolume
          groundClearance
          height
          interiorVolume
          length
          passengerVolume
          width
        }
        engine {
          aspiration
          blockType
          bore
          camType
          compressionRatio
          engineBrand
          fuelInduction
          maxHP
          maxTorque
          numberOfCylinders
          numberOfValves
          redlineRPM
          stroke
          totalDisplacement
        }
        oils {
          fuelConsumption
          fuelConsumptionCounterfeitRange
          fuelPrimaryTankCapacity
          fuelConsumptionSuspiciousRange
          fuelQuality
          fuelType
          fuelSecondaryTankCapacity
          oilCapacity
          oilType
        }
        transmission {
          numberOfGears
          transmissionBrand
          transmissionType
        }
        weights {
          curbWeight
          grossVehicleWeight
          maxPayload
          towingCapacity
        }
        wheels {
          brakeSystemType
          driveType
          frontTirePressure
          frontTireType
          frontTrackWidth
          frontWheelDiameter
          rearAxle
          rearTirePressure
          rearTireType
          rearTrackWidth
          rearWheelDiameter
          wheelBase
        }
      }
    }
  }
`;

export const GET_VEHICLES_ASSIGNMENTS = gql`
  query Data {
    getVehicleAssignments {
      data {
        vehicle {
          details {
            name
          }
        }
        trailer {
          details {
            name
            photoUrl
          }
        }
        createdAt
        expireAt
        _id
        operator {
          firstName
        }
        startTimestamp
      }
    }
  }
`;
export const GET_SINGLE_VEHICLE_ASSIGNMENT = gql`
  query GetVehicleAssignment($getVehicleAssignmentId: String!) {
    getVehicleAssignment(id: $getVehicleAssignmentId) {
      _id
      expireAt
      vehicle {
        _id
        details {
          name
        }
      }
      trailer {
        details {
          name
        }
        _id
      }
      operator {
        _id
        firstName
      }
      startTimestamp
    }
  }
`;
export const GET_ISSUES_List = gql`
  query GetIssues($options: ListOptionsInput) {
    getIssues(options: $options) {
      data {
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
        _id
      }
    }
  }
`;
export const GET_SINGLE_ISSUE = gql`
  query GetIssue($getIssueId: String!) {
    getIssue(id: $getIssueId) {
      _id
      assignTo {
        _id
        firstName
      }
      name
      reportedAt
      reportedBy {
        _id
        firstName
      }
      endTimestamp
      vehicle {
        _id
        details {
          name
        }
      }
      status
    }
  }
`;

export const GET_FINANCES_LIST = gql`
  query GetFinances {
    getFinances {
      data {
        _id
        vehicle {
          details {
            name
          }
        }
        expenses {
          description
          cost
          createdAt
          documentUrl
          photoUrl
          type
        }
        fuelTotalCost
        servicesTotalCost
        othersTotalCost
        createdAt
      }
    }
  }
`;

export const GET_SINGLE_FINANCES = gql`
  query GetFinance($getFinanceId: String!) {
    getFinance(id: $getFinanceId) {
      _id
      vehicle {
        _id
        details {
          name
        }
      }
      expenses {
        description
        cost
        createdAt
        documentUrl
        photoUrl
        type
      }
      fuelTotalCost
      servicesTotalCost
      othersTotalCost
      createdAt
    }
  }
`;

export const GET_INSPECTION_LIST = gql`
  query GetInspections($options: ListOptionsInput) {
    getInspections(options: $options) {
      data {
        _id
        assignTo {
          _id
          firstName
        }
        inspectionForm {
          _id
          name
        }
        endTimestamp
        startTimestamp
        status
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
  }
`;

export const GET_SINGLE_INSPECTION = gql`
  query GetInspection($getInspectionId: String!) {
    getInspection(id: $getInspectionId) {
      _id
      inspectionForm {
        tasks {
          comment
          description
          documentUrl
          name
          passed
          photoUrl
          text
          type
        }
        name
        _id
      }
      vehicle {
        _id
        details {
          name
        }
      }
      assignTo {
        _id
        firstName
      }
      endTimestamp
      startTimestamp
      status
    }
  }
`;

export const GET_INSPECTION_FORM = gql`
  query GetInspectionForms($options: ListOptionsInput) {
    getInspectionForms(options: $options) {
      data {
        _id
        name
        tasks {
          comment
          description
          documentUrl
          name
          passed
          photoUrl
          type
        }
      }
    }
  }
`;

export const GET_SERVICE_LIST = gql`
  query GetServices($filter: NonStrictServiceInput, $options: ListOptionsInput) {
    getServices(filter: $filter, options: $options) {
      data {
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
  }
`;
export const GET_SERVICE_PROGRAM = gql`
  query GetServiceProgram($getServiceProgramId: String!) {
    getServiceProgram(id: $getServiceProgramId) {
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
      assignedVehiclesCount
      createdAt
    }
  }
`;
export const GET_SERVICE_PROGRAMS = gql`
  query GetServicePrograms {
    getServicePrograms {
      data {
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
        assignedVehiclesCount
        createdAt
      }
    }
  }
`;
export const GET_SERVICE = gql`
  query GetService($getServiceId: String!) {
    getService(id: $getServiceId) {
      _id
      assignTo {
        _id
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

export const GET_EMPLOYEE = gql`
  query GetEmployees($options: ListOptionsInput) {
    getEmployees(options: $options) {
      data {
        _id
        classification
        email
        firstName
        birthdate

        group {
          _id
          name
        }
        licenseRenewalDate
        accessType
        assignedVehicles {
          _id
          details {
            name
          }
        }
      }
    }
  }
`;
export const GET_SINGLE_EMPLOYEE = gql`
  query GetEmployee($getEmployeeId: String!) {
    getEmployee(id: $getEmployeeId) {
      _id
      accessType
      address
      assignedVehicles {
        _id
        details {
          name
        }
      }
      birthdate
      city
      classification
      country
      createdAt
      email
      employeeNumber
      firstMobile
      firstName
      group {
        _id
        name
      }
      jobTitle
      lastName
      licenseClass
      licenseRenewalDate
      nationalId
      photoUrl
      secondMobile
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContacts($filter: NonStrictContactInput, $options: ListOptionsInput) {
  getContacts(filter: $filter, options: $options) {
      data {
        _id
        classification
        email
        firstAddress
        firstMobile
        name
        website
      }
    }
  }
`;
export const GET_SINGLE_CONTACT = gql`
  query GetContact($getContactId: String!) {
    getContact(id: $getContactId) {
      _id
      name
      email
      firstMobile
      secondMobile
      firstAddress
      secondAddress
      website
      classification
      createdAt
    }
  }
`;

// get warehouse
export const GET_WAREHOUSE = gql`
  query GetWarehouses($options: ListOptionsInput) {
    getWarehouses(options: $options) {
      data {
        _id
        avgCost
        totalQuantity
        name
        category
        description
        itemNumber
        photoUrl
        documentUrl
        partType {
          _id
          name
        }
        manufacturer {
          name
          _id
        }
      }
    }
  }
`;
export const GET_SINGLE_WAREHOUSE = gql`
  query GetWarehouse($getWarehouseId: String!) {
    getWarehouse(id: $getWarehouseId) {
      _id
      avgCost
      totalQuantity
      name
      category
      description
      photoUrl
      documentUrl
      itemNumber
      partType {
        _id
        name
      }
      manufacturer {
        name
        _id
      }
    }
  }
`;
export const GET_PART_TYPES = gql`
  query GetPartTypes($options: ListOptionsInput) {
    getPartTypes(options: $options) {
      data {
        _id
        name
      }
      totalCount
    }
  }
`;
export const GET_MANUFACTURERS = gql`
  query GetManufacturers($options: ListOptionsInput) {
    getManufacturers(options: $options) {
      data {
        name
        _id
      }
      totalCount
    }
  }
`;

export const GET_FUEL_HISTORY = gql`
  query GetFuelHistories {
    getFuelHistories {
      data {
        _id
        vehicle {
          details {
            name
            licensePlate
          }
        }
        receiptDate
        odometerReading
        vendor {
          name
          _id
        }
        fuelCost
        traveledDistance
        fuelTotalCost
        fuelCostPerTraveledDistanceUnit
        fuelConsumptionRate
        filledAmount
      }
    }
  }
`;

export const GET_SINGLE_FUEL_HISTORY = gql`
  query GetFuelHistory($getFuelHistoryId: String!) {
    getFuelHistory(id: $getFuelHistoryId) {
      _id
      vehicle {
        _id
        details {
          name
          licensePlate
        }
      }
      receiptDate
      odometerReading
      vendor {
        name
        _id
      }
      fuelCost
      isTankFilled
      traveledDistance
      fuelTotalCost
      fuelCostPerTraveledDistanceUnit
      fuelConsumptionRate
      filledAmount
    }
  }
`;

export const GET_GROUPS = gql`
  query GetGroups($filter: NonStrictGroupInput) {
    getGroups(filter: $filter) {
      data {
        name
        _id
      }
    }
  }
`;
// get vehicles for select in vehicle assignment

export const GET_VEHICLES_SELECT = gql`
  query Query {
    getVehicles {
      data {
        details {
          name
          type
        }
        _id
      }
    }
  }
`;

export const GET_OPERATORS_SELECT = gql`
  query GetEmployees($filter: NonStrictEmployeeInput) {
    getEmployees(filter: $filter) {
      data {
        _id
        firstName
        classification
      }
    }
  }
`;

export const GET_MAP_DATA = gql`
  query GetVehicles($options: ListOptionsInput) {
    getVehicles(options: $options) {
      data {
        _id
        latestLocation {
          latitude
          longitude
        }
        details {
          name
          status
        }
      }
    }
  }
`;
