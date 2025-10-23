import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { useThemeStore } from "../store/themeStore";
import { useNavigate } from "react-router";

export const Navbar = () => {
	const { theme, setTheme } = useThemeStore();
	const navigate = useNavigate();
	return (
		<nav className="w-full h-20 border-b">
			<div className="w-full h-full flex items-center justify-between">
				<div>
					<TbHexagonMinusFilled />
					<h1 className="text-5xl font-bold">Orbix</h1>
				</div>
				<div>
					<button
						onClick={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
					>
						{theme === "light" && <IoMoonSharp />}
						{theme === "dark" && <LuSun />}
					</button>
					<div>
						<button onClick={() => navigate("/wallets")}>
							wallet
						</button>
						<button onClick={() => navigate("/dapps")}>
							dapps
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
