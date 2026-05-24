import ShopInfoReducer from "./Reducers/ShopInfoReducer";
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import orderReducer from "./Reducers/orderReducer";
import listingReducer from "./Reducers/listingReducer";

const rootReducer = {
    shopInfo : ShopInfoReducer,
    auth : authReducer,
    category : categoryReducer,
    product : productReducer,
    order : orderReducer,
    listing : listingReducer,
}

export default rootReducer