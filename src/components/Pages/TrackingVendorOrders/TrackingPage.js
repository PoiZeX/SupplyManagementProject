import React from "react";
import { VendorStatisticsCubes } from "./VendorStatisticsCubes";
import VendorOrderStatistics from "./VendorOrderStatistics";
import { Card } from "../../../common/Elements";
import { GetAllOrders } from "../../../backend/DataFetching/VendorOrdersHandler";
import VendorOrderTable from "./VendorOrderTable";

export function TrackingPage() {
  const [orders, setOrders] = React.useState([]);

  async function fetchData() {
    try {
      const response = await GetAllOrders();
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  // I did here something like delegate
  async function handleTableChange(updatedOrders) {
    if (updatedOrders == null || updatedOrders === undefined) await fetchData();
    else 
      if (updatedOrders.length > 1) setOrders(updatedOrders);
      else setOrders(orders.concat(updatedOrders));
  }
  
  return (
    <>
      {/* STATISTICS */}

      <Card title="Relevant issues">
        <VendorStatisticsCubes orders={orders} onChange={handleTableChange} />{" "}
        <VendorOrderStatistics orders={orders} />
      </Card>

      {/* TABLE OF ORDERS */}

      <Card title="Orders from vendor">
        <VendorOrderTable orders={orders} onChange={handleTableChange} />
      </Card>
    </>
  );
}
