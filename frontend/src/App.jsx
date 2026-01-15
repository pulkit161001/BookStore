import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import CreateBook from "./pages/CreateBook";
import { SnackbarProvider } from "notistack";

const App = () => {
	return (
		<BrowserRouter>
			<SnackbarProvider>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/books/create"
						element={<CreateBook />}
					></Route>
					<Route
						path="books/delete/:id"
						element={<DeleteBook />}
					></Route>
					<Route
						path="/books/edit/:id"
						element={<EditBook />}
					></Route>
					<Route
						path="/books/details/:id"
						element={<ShowBook />}
					></Route>
				</Routes>
			</SnackbarProvider>
		</BrowserRouter>
	);
};

export default App;
