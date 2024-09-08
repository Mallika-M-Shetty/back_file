const express = require("express");
const axios = require("axios");
const router = express.Router();
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;

const condet = require("../../config/dbconn");
const planeturl = require("../../config/planeturl");
const key = require("../../config/keys");
const dbquery = require("../../config/dbquery");

// API TO FETCH iNVOICE NUMBER AND GET DETAILS FROM THE SQL
router.post("/fetchinvoice", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body.invoice_number);
  let Invid = req.body.invoice_number;

  let resultdetails = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };

  const connection = new Connection(config);

  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED ****");
      console.log(connection.state.name);
    }

    // Read all rows from table
    const invoice = new Request(
      dbquery.baseinfo_query_o + "'" + Invid + "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          return res.status(200).json("CONNECTION BROKE WITH DB");
        }
      }
    );

    let response = [];
    invoice.on("row", (columns) => {
      columns.forEach((column) => {
        response[column.metadata.colName] = column.value;
      });

      let responsearr = {
        // TransactionId: response.TransactionId,
        // ActualDate: response.ActualDate,
        // SubTotal: response.SubTotal,
        // Tax: response.Tax,
        // Total: response.Total,
        // TransactionKey: response.TransactionKey,
        TransactionId: response.TransactionId,
        ActualDate: response.ActualDate,
        SubTotal: response.SubTotal,
        Tax: response.Tax,
        Total: response.Total,
        TransactionKey: response.TransactionKey,
        TransactionCustomerName: response.TransactionCustomerName,
        TotalTaxableAmount: response.TotalTaxableAmount,
        DisccountAmount: response.DiscountAmount,
        LineItemCount: response.LineItemCount,
        CustomerKey: response.CustomerKey,
        UserKey: response.UserKey,
      };
      resultdetails.push(responsearr);
      console.log(resultdetails);
      return res.status(200).json({ basicinfo: resultdetails });
    });
    connection.execSql(invoice);
  });
});

// API TO FETCH ITEMS FROM DB
router.post("/fetchinvoiceitem", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("main second api ke andar hun");
  console.log(req.body.Transaction_Key);
  let trxkey = req.body.Transaction_Key;
  let resultas = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };
  const connection = new Connection(config);
  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED FOR SECOND QUERY ****");
      console.log(connection.state.name);
    }
    saleitem = new Request(
      dbquery.iteminfo_query_o + "'" + trxkey + "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          rco = rowCount;
          console.log(rowCount);
        }
      }
    );

    let records = [];

    let SI = [];
    saleitem.on("row", (columns) => {
      for (const column of columns) {
        SI[column.metadata.colName] = column.value;
      }

      // pseudo code
      // we are simply ignoring it
      if (error & (error != "ER_DUP_ENTRY")) {
        // do normal error handling
      }

      let items = {
        // ProductKey: SI.ProductKey,
        // description: SI.Description,
        // quantity: SI.Quantity,
        // unitPrice: SI.BasePrice,
        // vatCode: key.vatCode,
        // vatAmount: SI.Tax,
        // netAmount: SI.Quantity * SI.BasePrice,
        // grossAmount: SI.Quantity * SI.BasePrice + SI.Tax,
        // merchandiseGroup: key.merchandise_group,
        // taxRefundEligible: true,
        ProductKey: SI.ProductKey,
        description: SI.Description,
        quantity: SI.Quantity,
        unitPrice: SI.BasePrice,
        vatCode: key.vatCode,
        vatAmount: SI.Tax,
        netAmount: SI.Quantity * SI.BasePrice,
        grossAmount: SI.Quantity * SI.BasePrice + SI.Tax,
        Total: SI.Total,
        OriginalPrice: SI.OriginalPrice,
        DiscountAmount: SI.DiscountAmount,
        merchandiseGroup: key.merchandise_group,
        taxRefundEligible: true,
      };
      records.push(items);
    });
    saleitem.on("doneInProc", function () {
      console.log(records);
      res.json({ invitem: records });
    });

    connection.execSql(saleitem);
  });
});

// API TO FETCH iNVOICE NUMBER AND GET DETAILS FROM THE SQL
router.post("/fetchcustomer", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body.Customer_Key);
  let trxkey = req.body.Customer_Key;

  let resultdetails = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };

  const connection = new Connection(config);

  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED third api ****");
      console.log(connection.state.name);
    }

    // Read all rows from table
    const invoice = new Request(
      "SELECT Id from CXSRetailAJO093.dbo.CusCustomer WHERE [CustomerKey] =" +
        "'" +
        trxkey +
        "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          return res.status(200).json("CONNECTION BROKE WITH DB");
        }
      }
    );

    let response = [];
    invoice.on("row", (columns) => {
      columns.forEach((column) => {
        response[column.metadata.colName] = column.value;
      });

      let responsearr = {
        Cus_Id: response.Id,
      };
      resultdetails.push(responsearr);
      console.log(resultdetails);
      return res.status(200).json(resultdetails);
    });
    connection.execSql(invoice);
  });
});

// API TO FETCH ITEMS FROM DB
router.post("/tenderamount", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("main second api ke andar hun");
  console.log(req.body.Transaction_Key);
  let trxkey = req.body.Transaction_Key;
  let resultas = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };
  const connection = new Connection(config);
  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED FOR SECOND QUERY ****");
      console.log(connection.state.name);
    }
    saleitem = new Request(
      "select Amount,PaymentTypeKey from CXSRetailAJO093.dbo.TrxTransactionPayment where [TransactionKey] =" +
        "'" +
        trxkey +
        "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          rco = rowCount;
          console.log(rowCount);
        }
      }
    );

    let resultdetails = [];

    let SI = [];
    saleitem.on("row", (columns) => {
      for (const column of columns) {
        SI[column.metadata.colName] = column.value;
      }

      let items = {
        Tend_Amount: SI.Amount,
        Tend_ptk: SI.PaymentTypeKey,
      };
      resultdetails.push(items);
    });
    saleitem.on("doneInProc", function () {
      console.log(resultdetails);
      res.json({ payinfo: resultdetails });
    });

    connection.execSql(saleitem);
  });
});

// API TO FETCH iNVOICE NUMBER AND GET DETAILS FROM THE SQL
router.post("/tendercard", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body.PaymentTypeKey);
  let ptk = req.body.PaymentTypeKey;
  console.log("mazin");
  console.log(ptk);
  console.log("mazin");

  let resultdetails = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };

  const connection = new Connection(config);

  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED fifth api ****");
      console.log(connection.state.name);
    }

    // Read all rows from table
    const invoice = new Request(
      "select Description from CXSRetailAJO093.dbo.PmtPaymentType where [PaymentTypeKey] =" +
        "'" +
        ptk +
        "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          return res.status(200).json("CONNECTION BROKE WITH DB");
        }
      }
    );

    let response = [];
    invoice.on("row", (columns) => {
      columns.forEach((column) => {
        response[column.metadata.colName] = column.value;
      });

      let responsearr = {
        Description: response.Description,
      };
      resultdetails.push(responsearr);
      console.log(resultdetails);
      return res.status(200).json({ resultdetails });
    });
    connection.execSql(invoice);
  });
});

// API TO FETCH iNVOICE NUMBER AND GET DETAILS FROM THE SQL
router.post("/salesperson", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body.UserKey);
  let uk = req.body.UserKey;

  let resultdetails = new Array();

  // Configurations for db
  var config = {
    server: condet.server,
    authentication: {
      type: condet.type,
      options: {
        userName: condet.userName,
        password: condet.password,
        database: condet.database,
      },
    },
    options: {
      trustServerCertificate: condet.trustServerCertificate,
      port: condet.port,
    },
  };

  const connection = new Connection(config);

  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
      throw err;
    } else {
      console.log("**** CONNECTED fifth api ****");
      console.log(connection.state.name);
    }

    // Read all rows from table
    const invoice = new Request(
      "select Id,FirstName,LastName from CXSRetailAJO093.dbo.LbrUser where [UserKey] =" +
        "'" +
        uk +
        "'",
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
          return res.status(200).json("CONNECTION BROKE WITH DB");
        }
      }
    );

    let response = [];
    invoice.on("row", (columns) => {
      columns.forEach((column) => {
        response[column.metadata.colName] = column.value;
      });

      let responsearr = {
        Id: response.Id,
        FirstName: response.FirstName,
        LastName: response.LastName,
      };
      resultdetails.push(responsearr);
      console.log(resultdetails);
      return res.status(200).json({ resultdetails });
    });
    connection.execSql(invoice);
  });
});

// API TO send data to the planet
router.post("/userformdata", async (req, res) => {
  var params = new URLSearchParams();
  params.append("client_id", key.client_id);
  params.append("client_secret", key.client_secret);
  params.append("grant_type", key.grant_type);

  const planapicalldt = await axios.post(planeturl.token_api, params, {
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  let at = planapicalldt.data.access_token;
  console.log("Reached inside user form data ");
  let body = req.body;
  console.log("x-x-x-x-x-x-x-x-x-x-x-x-x--x-x");

  try {
    await axios
      .post(planeturl.new_transc, body, {
        headers: {
          Authorization: `bearer ${at}`,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.taxRefundResponse);
        let resdttag = response.data.taxRefundResponse;
        res.status(200).json({ stcode: 200, response: resdttag });
      })
      .catch(function (error) {
        let details = error.response.data;
        res.status(200).json({ stcode: 500, details: details });
      });
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    }
  }
});

// API TO CANCEL OR VOID ANY TRANSACTION SEND TO PLANET
router.post("/canceltoken", async (req, res) => {
  var params = new URLSearchParams();
  params.append("client_id", key.client_id);
  params.append("client_secret", key.client_secret);
  params.append("grant_type", key.grant_type);
  const planapicalldt = await axios.post(planeturl.token_api, params, {
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  let at = planapicalldt.data.access_token;
  console.log("Reached inside canceltoken ");
  let body = req.body;

  try {
    await axios
      .post(planeturl.cancel_transac, body, {
        headers: {
          Authorization: `bearer ${at}`,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        res.status(200).json({ stcode: 200, response: response.data });
      })
      .catch(function (error) {
        let details = error.response.data;
        res.status(200).json({ stcode: 500, details: details });
      });
  } catch (error) {
    if (error.response) {
      console.log(error);
      return error.response;
    } else if (error.request) {
      return error.request;
    }
  }
});

module.exports = router;
