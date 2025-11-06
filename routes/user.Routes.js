import express from 'express'
import { changepassword, forgotpassword, login, logout, resetpassword, Signup } from '../controllers/user.controllers.js';
import { isAuthorized } from '../middleware/auth.middleware.js';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js';
import { createInvoice ,getAllInvoices,getInvoiceById, updateInvoice ,deleteInvoice} from '../controllers/saleinvoice.controller.js';
import { addCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../controllers/customer.controllers.js';

const router=express.Router();

router.post("/signup", Signup)
router.post("/login", login)
router.post("/forgot-password", forgotpassword)
router.post("/reset-password/:token", resetpassword)
router.post("/change-password", isAuthorized,changepassword)
router.post("/logout", isAuthorized, logout);


//Product
router.post("/products", isAuthorized, addProduct); 
router.put("/products/:productId", isAuthorized, updateProduct); 
router.delete("/products/:productId", isAuthorized, deleteProduct); 
router.get("/products/:productId", isAuthorized, getProduct); 
router.get("/products", isAuthorized, getAllProducts);


//customer
router.post("/customer",isAuthorized, addCustomer);
router.get("/customer", isAuthorized,getAllCustomers);
router.get("/customer/:id",isAuthorized, getCustomerById);
router.put("/customer/:id",isAuthorized, updateCustomer);
router.delete("/customer/:id",isAuthorized, deleteCustomer);



//sale Invoice
router.post("/saleinvoice",isAuthorized, createInvoice);
router.get("/saleinvoice",isAuthorized, getAllInvoices);
router.get("/saleinvoice/:id",isAuthorized, getInvoiceById);
router.put("/saleinvoice/:id", isAuthorized,updateInvoice);
router.delete("/saleinvoice/:id",isAuthorized, deleteInvoice);
export default router;