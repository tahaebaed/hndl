import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tab } from 'react-bootstrap';
// import PerfectScrollbar from 'react-perfect-scrollbar'
//** Import Image */

import { useQuery } from '@apollo/client';
import { GET_DASHBOARD } from '../../../../utilities/Apollo/Querries';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Loader from '../../../../utilities/Loader';

const Home = () => {
  const { data: dashboardData, loading, error } = useQuery(GET_DASHBOARD);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>Something went wrong {error.message}...</p>;
  }

  return (
    <Fragment>
      {/* <!-- Add Order --> */}
      <div className='row'>
        <div className='col-xl-12'>
          <div className='row'>
            <div className='row col-xl-6'>
              <h2 className='col-sm-12 mb-4'>Vehicles Status</h2>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-success font-w600'>
                          {dashboardData.getDashboard.vehiclesStatus.Active}
                        </h2>
                        <span className='fs-16 '>Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-warning font-w600'>
                          {dashboardData.getDashboard.vehiclesStatus.Inactive}
                        </h2>
                        <span className='fs-16 '>Inactive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-info font-w600'>
                          {dashboardData.getDashboard.vehiclesStatus.In_Shop}
                        </h2>
                        <span className='fs-16 '>In Shop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-danger font-w600'>
                          {dashboardData.getDashboard.vehiclesStatus.Out_Of_Service}
                        </h2>
                        <span className='fs-16'>Out Of Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className='col-sm-12 mb-4'>Vehicles Assignments</h2>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-success font-w600'>
                          {dashboardData.getDashboard.vehiclesAssignments.Assigned}
                        </h2>
                        <span className='fs-16 '>Assigned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-warning font-w600'>
                          {dashboardData.getDashboard.vehiclesAssignments.Unassigned}
                        </h2>
                        <span className='fs-16 '>Unassigned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className='col-sm-12 mb-4'>vehicles Renewal Reminders</h2>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-danger font-w600'>
                          {dashboardData.getDashboard.vehiclesLicenseRenewalReminders.overdue}
                        </h2>
                        <span className='fs-16 '>Over Due</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-warning font-w600'>
                          {dashboardData.getDashboard.vehiclesLicenseRenewalReminders.dueSoon}
                        </h2>
                        <span className='fs-16 '>Due Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Inspection Summary</h4>
                  </div>
                  <div className='card-body text-center'>
                    <div>
                      <Pie
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: 'Last 30 Days',
                            },
                          },
                        }}
                        data={{
                          labels: [
                            'Open',
                            'Overdue',
                            'Scheduled',
                            'Submitted',
                            'Submitted_With_failure',
                          ],
                          datasets: [
                            {
                              label: '# of',
                              data: [
                                dashboardData.getDashboard.inspectionsStatus.Open,
                                dashboardData.getDashboard.inspectionsStatus.Overdue,
                                dashboardData.getDashboard.inspectionsStatus.Scheduled,
                                dashboardData.getDashboard.inspectionsStatus.Submitted,
                                dashboardData.getDashboard.inspectionsStatus.Submitted_With_failure,
                              ],
                              backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 122, 132, 0.2)',
                                'rgba(54, 142, 226, 0.2)',
                                'rgba(54, 112, 212, 0.2)',
                              ],
                              borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 122, 132, 1)',
                                'rgba(54, 142, 226, 1)',
                                'rgba(54, 112, 212, 1)',
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row px-3'>
                <h2 className='col-sm-12 mb-1'>Open Issue</h2>
                <div className='col-sm-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media align-items-center'>
                        <div className='media-body mr-3'>
                          <h2 className='num-text text-warning font-w600'>
                            {dashboardData.getDashboard.issuesStatus.Open}
                          </h2>
                          <span className='fs-16 '>Open</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='media align-items-center'>
                        <div className='media-body mr-3'>
                          <h2 className='num-text text-success font-w600'>
                            {dashboardData.getDashboard.issuesStatus.Overdue}
                          </h2>
                          <span className='fs-16 '>Over Due</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Cost Per Meter</h4>
                  </div>
                  <div className='card-body text-center'>
                    <Line
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                      data={{
                        labels: Object.keys(
                          dashboardData.getDashboard.fuelCostPerTraveledDistanceUnit,
                        ).filter((key) => key !== '__typename'),
                        datasets: [
                          {
                            label: 'Cost/Mi',
                            data: Object.values(
                              dashboardData.getDashboard.fuelCostPerTraveledDistanceUnit,
                            ).filter((key) => key !== 'MonthsDistribution'),
                            backgroundColor: 'rgba(54, 112, 212, 1)',
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='row col-lg-6 px-3'>
              <h2 className='col-sm-12 mb-1'>Service Reminder</h2>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-warning font-w600'>
                          {dashboardData.getDashboard.serviceStatus.Overdue}
                        </h2>
                        <span className='fs-16 '>Over Due</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-success font-w600'>
                          {dashboardData.getDashboard.serviceStatus.Open}
                        </h2>
                        <span className='fs-16 '>Due soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6 h-full'>
                <div className='card'>
                  <Tab.Container
                  // defaultActiveKey={tabData[0].name.toLowerCase()}
                  >
                    <div className='card-header mb-0 d-sm-flex flex-wrap d-block shadow-sm border-0 align-items-center'>
                      <div className='mr-auto pr-3 mb-3'>
                        <h4 className='text-black fs-20 mb-sm-0 mb-2'>Service Costs</h4>
                      </div>
                      <div className='card-action card-tabs  mt-sm-0 mb-3 mt-sm-0 '></div>
                    </div>
                    <div className='card-body'>
                      <Tab.Content className=''>
                        <Bar
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                              title: {
                                display: false,
                                text: 'Service Costs',
                              },
                            },
                          }}
                          data={{
                            labels: Object.keys(dashboardData.getDashboard.serviceCosts).filter(
                              (key) => key !== '__typename',
                            ),
                            datasets: [
                              {
                                label: 'Costs',
                                data: Object.values(dashboardData.getDashboard.serviceCosts).filter(
                                  (key) => key !== 'MonthsDistribution',
                                ),
                                backgroundColor: 'rgba(225, 200, 100, 1)',
                              },
                            ],
                          }}
                        />
                      </Tab.Content>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>

            <div className='row col-lg-6 px-3'>
              <h2 className='col-sm-12 mb-1'>Operator Renewal Reminders</h2>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-warning font-w600'>
                          {dashboardData.getDashboard.operatorLicenseRenewalReminders.overdue}
                        </h2>
                        <span className='fs-16 '>Over Due</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='media align-items-center'>
                      <div className='media-body mr-3'>
                        <h2 className='num-text text-success font-w600'>
                          {dashboardData.getDashboard.operatorLicenseRenewalReminders.dueSoon}
                        </h2>
                        <span className='fs-16 '>Due soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Fuel Costs</h4>
                  </div>

                  <div className='card-body text-center'>
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: false,
                            text: 'Service Costs',
                          },
                        },
                      }}
                      data={{
                        labels: Object.keys(dashboardData.getDashboard.fuelCosts).filter(
                          (key) => key !== '__typename',
                        ),
                        datasets: [
                          {
                            label: 'Costs',
                            data: Object.values(dashboardData.getDashboard.fuelCosts).filter(
                              (key) => key !== 'MonthsDistribution',
                            ),
                            backgroundColor: 'rgba(54, 225, 150, 1)',
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Other Costs</h4>
                  </div>

                  <div className='card-body text-center'>
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: false,
                            text: 'Service Costs',
                          },
                        },
                      }}
                      data={{
                        labels: Object.keys(dashboardData.getDashboard.otherCosts).filter(
                          (key) => key !== '__typename',
                        ),
                        datasets: [
                          {
                            label: 'Costs',
                            data: Object.values(dashboardData.getDashboard.otherCosts).filter(
                              (key) => key !== 'MonthsDistribution',
                            ),
                            backgroundColor: 'rgba(225, 200, 100, 1)',
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row col-xl-6'>
              <div className='col-xl-6 col-xxl-12 col-md-6'>
                <div className='card'>
                  <div className='card-header border-0 shadow-sm'>
                    <h4 className='fs-20 text-black font-w600'>Total Costs</h4>
                  </div>

                  <div className='card-body text-center'>
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: false,
                            text: 'Service Costs',
                          },
                        },
                      }}
                      data={{
                        labels: Object.keys(dashboardData.getDashboard.totalCosts).filter(
                          (key) => key !== '__typename',
                        ),
                        datasets: [
                          {
                            label: 'Costs',
                            data: Object.values(dashboardData.getDashboard.totalCosts).filter(
                              (key) => key !== 'MonthsDistribution',
                            ),
                            backgroundColor: 'rgba(54, 112, 212, 1)',
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
