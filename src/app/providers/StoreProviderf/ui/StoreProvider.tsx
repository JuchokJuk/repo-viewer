import { Provider } from "react-redux";
import { store } from "../config/store";

interface IStoreProviderProps {
   children: React.ReactNode;
}

export const StoreProvider = ({ children }: IStoreProviderProps) => {
   return <Provider store={store}>{children}</Provider>;
};
