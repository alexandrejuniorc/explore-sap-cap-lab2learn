const cds = require("@sap/cds");

module.exports = async (service) => {
  const salesOrder = await cds.connect.to("API_SALES_ORDER_SRV");

  service.on("READ", "A_SalesOrder", (request) => {
    const data = salesOrder.transaction(request).send({
      query: request.query,
      headers: {
        apiKey: "dzbnouSLAV0Rhr8RHMvsLRAA1iXAp4uG",
      },
    });

    return data;
  });

  service.on("getSalesOrderAmountBySoldToParty", async (request) => {
    const data = await salesOrder.transaction(request).send({
      query: SELECT.from(salesOrder.entities.A_SalesOrder).limit(1000),
      headers: {
        apiKey: "dzbnouSLAV0Rhr8RHMvsLRAA1iXAp4uG",
      },
    });

    const salesOrderAmountBySoldToParty = data.reduce((acc, curr) => {
      if (acc[curr.SoldToParty]) {
        acc[curr.SoldToParty] = Number(
          Number(acc[curr.SoldToParty]) + curr.TotalNetAmount
        ).toFixed(2);

        return acc;
      }

      acc[curr.SoldToParty] = curr.TotalNetAmount.toFixed(2);
      return acc;
    }, {});

    return salesOrderAmountBySoldToParty;
  });
};
