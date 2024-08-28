import CanvasJSReact from '@canvasjs/react-charts';
import { CompanyList } from "../../pages/companies/index";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Dashboard = () => {

    // char data large
    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            // text: "Growth of Job Media"
        },
        axisY: {
            title: "Capacity (in MWp)",
            logarithmic: true
        },
        data: [{
            type: "spline",
            showInLegend: true,
            legendText: "MWp = one megawatt peak",
            dataPoints: [
                { x: new Date(2001, 0), y: 1615 },
                { x: new Date(2002, 0), y: 2069 },
                { x: new Date(2003, 0), y: 2635 },
                { x: new Date(2004, 0), y: 3723 },
                { x: new Date(2005, 0), y: 5112 },
                { x: new Date(2006, 0), y: 6660 },
                { x: new Date(2007, 0), y: 9183 },
                { x: new Date(2008, 0), y: 15844 },
                { x: new Date(2009, 0), y: 23185 },
                { x: new Date(2010, 0), y: 40336 },
                { x: new Date(2011, 0), y: 70469 },
                { x: new Date(2012, 0), y: 100504 },
                { x: new Date(2013, 0), y: 138856 },
                { x: new Date(2014, 0), y: 178391 },
                { x: new Date(2015, 0), y: 229300 },
                { x: new Date(2016, 0), y: 302300 },
                { x: new Date(2017, 0), y: 405000 }
            ]
        }]
    }

    // char data circle
    const options2 = {
        animationEnabled: true,
       // exportEnabled: true,
        theme: "light1",// "light1", "dark1", "dark2"
        title: {
            // text: "Trip Expenses"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 20, label: "Airfare" },
                { y: 24, label: "Food & Drinks" },
                { y: 20, label: "Accomodation" },
                { y: 14, label: "Transportation" },
                { y: 12, label: "Activities" },
                { y: 10, label: "Misc" }
            ]
        }]
    }

    return (
      <>
        <h2 className=" font-bold text-xl text-[#012970] mb-2">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 md: gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:my-0 ">
              {/* cart item start */}
              <div className="shadow-md p-3 rounded-md bg-primary text-white border border-primary">
                <h3 className="text-[#fff] font-semibold">
                  Total Job | <span className="text-gray-400">Today</span>
                </h3>
                <div className="flex items-center gap-3 py-2">
                  <span class="material-symbols-outlined">work</span>
                  <p className=" leading-4">
                    <span className="text-white font-bold text-[18px]">
                      145
                    </span>{" "}
                    <br />
                    <span className="text-gray-400 text-[14]">Total Job</span>
                  </p>
                </div>
              </div>
              {/* cart item end */}

              {/* cart item start */}
              <div className="shadow-md p-3 rounded-md bg-primary border border-primary text-white">
                <h3 className="text-[#fff] font-semibold">Total Category</h3>
                <div className="flex items-center gap-3 py-2">
                  <span class="material-symbols-outlined">category</span>
                  <p className=" leading-4">
                    <span className="text-white font-bold text-[18px]">
                      345
                    </span>{" "}
                    <br />
                    <span className="text-gray-400 text-[14px]">
                      Total Category
                    </span>
                  </p>
                </div>
              </div>
              {/* cart item end */}

              

              <div className="shadow-md p-3 rounded-md bg-primary text-white border border-primary">
                <h3 className="text-[#fff] font-semibold">Total Skill </h3>
                <div className="flex items-center gap-3 py-2">
                  <span class="material-symbols-outlined">skillet</span>
                  <p className=" leading-4">
                    <span className="text-white font-bold text-[18px]">
                      45
                    </span>{" "}
                    <br />
                    <span className="text-gray-400 text-[14px]">Total Skill</span>
                  </p>
                </div>
              </div>
            </div>

            <div className='my-5'>
                <CompanyList/>
            </div>

            {/* char */}
            <div className="my-8">
              {/* <CanvasJSChart
                options={options}
              
              /> */}
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </div>
          {/* right side */}
          <div className="col-span1">
            {/* recent */}
            <div className="bg-white p-3 mb-5">
              <h2 className="text-primary font-bold">
                Recent Activity{" "}
                <span className="text-gray-300 font-[400] text-[12px]">
                  | Today
                </span>
              </h2>
              <ul>
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>

                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>

                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
                <hr />
                <li className="flex items-center gap-2 my-1 ">
                  <span className="text-[12px]">32 min</span>
                  <span class="material-symbols-outlined text-[12px]">
                    sync
                  </span>
                  <span className="text-[12px]">
                    Jomuna group posted new job
                  </span>
                </li>
              </ul>
            </div>
            {/* chart */}
            <div className="bg-white px-3">
              <h2 className="text-primary font-bold">
                Category Report{" "}
                <span className="text-gray-300 font-[400] text-[12px]">
                  | This Month
                </span>{" "}
              </h2>
              <CanvasJSChart
                options={options2}
                /* onRef={ref => this.chart = ref} */
              />
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </div>
        </div>

        
      </>
    );
}