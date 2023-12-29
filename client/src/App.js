import React, { Component } from 'react';

import SignIn from './pages/admin/SignIn';
import LogOut from './pages/admin/LogOut';
import Home from './pages/admin/Home';

import ReceiveList from './pages/admin/Receive/List';
import ReceiveNew from './pages/admin/Receive/New';
import ReceiveDetails from './pages/admin/Receive/Details';
import ReceiveImport from './pages/admin/Receive/Excel.js';

import DistributeList from './pages/admin/Distribute/List';
import DistributeNew from './pages/admin/Distribute/New';
import DistributeDetails from './pages/admin/Distribute/Details';

import Orders from './pages/admin/Orders/List.js';

import ReportsIndex from './pages/admin/Reports/Index.js';
import ReportsSuppliers from './pages/admin/Reports/Suppliers.js';
import ReportsCustomers from './pages/admin/Reports/Customers.js';
import ReportsProducts from './pages/admin/Reports/Products.js';

import InputIndex from './pages/admin/Input/Index.js';

import InputSuppliersList from './pages/admin/Input/Suppliers/List.js';
import InputSuppliersNew from './pages/admin/Input/Suppliers/New.js';
import InputSuppliersDetails from './pages/admin/Input/Suppliers/Details.js';
import InputSuppliersEdit from './pages/admin/Input/Suppliers/Edit.js';

import InputCustomersList from './pages/admin/Input/Customers/List.js';
import InputCustomersNew from './pages/admin/Input/Customers/New.js';
import InputCustomersDetails from './pages/admin/Input/Customers/Details.js';
import InputCustomersEdit from './pages/admin/Input/Customers/Edit.js';

import InputCustomersDailySales from './pages/admin/Daily Sales/DailySales.js'
import InputCustomersOrders from './pages/admin/Input/Customers/Orders.js'
import InputCustomersStock from './pages/admin/Input/Customers/Stock.js'
import DailySalesImport from './pages/admin/Daily Sales/Excel.js';

import InputProductsList from './pages/admin/Input/Products/List.js';
import InputProductsNew from './pages/admin/Input/Products/New.js';
import InputProductsDetails from './pages/admin/Input/Products/Details.js';
import InputProductsEdit from './pages/admin/Input/Products/Edit.js';
import InputProductsImport from './pages/admin/Input/Products/Excel.js';
import InputProductsAdd from './pages/admin/Input/Products/Add.js';
import InputProductsStock from './pages/admin/Input/Products/StockLevel.js';

import ManualStockEntry from './pages/admin/Input/Manual Stock Entry/List.js';

import RequisitionList from './pages/admin/Requisitions/List';
import RequisitionNew from './pages/admin/Requisitions/New';
import RequisitionDetails from './pages/admin/Requisitions/Details';

import AdminIndex from './pages/admin/Admin/Index.js';

import UsersList from './pages/admin/Admin/Users/List';
import UsersNew from './pages/admin/Admin/Users/New';
import UsersDetails from './pages/admin/Admin/Users/Details';
import UsersEdit from './pages/admin/Admin/Users/Edit';

import AdjustmentsIndex from './pages/admin/Admin/Adjustments/Index.js';
import AdjustmentsPrices from './pages/admin/Admin/Adjustments/Prices.js';
import AdjustmentsStockLevels from './pages/admin/Admin/Adjustments/StockLevels.js';

import DataTableTest from './pages/admin/DataTableTest.js';

import CalendarTest from './pages/admin/CalendarTest.js';

import Settings from './pages/admin/Settings';
import NotFound from './pages/404';

import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route path="/sign-in/" component={SignIn}/>
            <Route path="/logout/" component={LogOut}/>

            <Route exact path="/test" component={CalendarTest}/>

            <Route exact path="/" component={Home}/>
            <Route exact path="/test" component={DataTableTest}/>

            <Route path="/receive" exact component={ReceiveList}/>
            <Route path="/receive/new" exact component={ReceiveNew}/>
            <Route path="/receive/v/:id" exact component={ReceiveDetails}/>
            <Route path="/receive/import" exact component={ReceiveImport}/>

            <Route path="/distributions" exact component={DistributeList}/>
            <Route path="/distributions/new" exact component={DistributeNew}/>
            <Route path="/distributions/v/:id" exact component={DistributeDetails}/>
            
            <Route path="/orders" exact component={Orders}/>

            <Route path="/reports" exact component={ReportsIndex} />
            <Route path="/reports/suppliers" exact component={ReportsSuppliers} />
            <Route path="/reports/customers" exact component={ReportsCustomers} />
            <Route path="/reports/products" exact component={ReportsProducts} />

            <Route path="/suppliers" exact component={InputSuppliersList} />
            <Route path="/suppliers/new" exact component={InputSuppliersNew} />
            <Route path="/suppliers/e/:id" exact component={InputSuppliersEdit} />
            <Route path="/suppliers/v/:id" exact component={InputSuppliersDetails} />

            <Route path="/input" exact component={InputIndex} />
            <Route path="/customers" exact component={InputCustomersList} />
            <Route path="/customers/new" exact component={InputCustomersNew} />
            <Route path="/customers/e/:id" exact component={InputCustomersEdit} />
            <Route path="/customers/v/:id" exact component={InputCustomersDetails} />
            
            <Route path="/customers/o/:id" exact component={InputCustomersOrders} />
            <Route path="/customers/s" exact component={InputCustomersStock} />

            <Route path="/daily-sales" exact component={InputCustomersDailySales} />
            <Route path="/manual-stock-entry" exact component={ManualStockEntry} />
            <Route path="/daily-sales/import" exact component={DailySalesImport} />

            <Route path="/products" exact component={InputProductsList} />
            <Route path="/products/new" exact component={InputProductsNew} />
            <Route path="/products/e/:id" exact component={InputProductsEdit} />
            <Route path="/products/v/:id" exact component={InputProductsDetails} />
            <Route path="/products/import" exact component={InputProductsImport} />
            <Route path="/products/add" exact component={InputProductsAdd} />
            <Route path="/products/s/:id" exact component={InputProductsStock} />

            <Route path="/admin" exact component={AdminIndex}/>
            <Route path="/admin/users" exact component={UsersList}/>
            <Route path="/admin/users/new" exact component={UsersNew}/>
            <Route path="/admin/users/v/:id" exact component={UsersDetails}/>
            <Route path="/admin/users/e/:id" exact component={UsersEdit} />
            
            <Route path="/admin/adjustments" exact component={AdjustmentsIndex} />
            <Route path="/admin/adjustments/prices" exact component={AdjustmentsPrices} />
            <Route path="/admin/adjustments/stock-levels" exact component={ManualStockEntry} /> {/* AdjustmentsStockLevels */}
            
            <Route path="/settings" component={Settings}/>
            <Route component={NotFound} exact />
        </Switch>
      </div>
    );
  }
}

export default App;