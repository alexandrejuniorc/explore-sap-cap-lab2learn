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
};
