    module.exports = {
        baseinfo_query_o: "SELECT TransactionId,ActualDate,SubTotal,Tax,Total,TransactionKey,TotalTaxableAmount,DiscountAmount,TransactionCustomerName,LineItemCount,CustomerKey,UserKey FROM CXSRetailAJO093.dbo.trxtransaction WHERE [TransactionId] =",
        iteminfo_query_o:"SELECT ProductKey,Description,Quantity,BasePrice,Tax,OriginalPrice,Total,DiscountAmount FROM CXSRetailAJO093.dbo.TrxTransactionSaleItem  WHERE [TransactionKey] =",
        Customerid_query: "SELECT Id from CXSRetailAJO093.dbo.CusCustomer WHERE [CustomerKey] =",
        };
