import React, {useEffect, useState} from "react";
import api from "./services/api";
import './App.css';
import dia_limpo from "./img/dia-limpo.svg";
import dia_nublado from "./img/dia-nublado.svg";
import erro_noite from "./img/erro-noite.svg";
import granizo from "./img/granizo.svg";
import neblina from "./img/neblina.svg";
import neve from "./img/neve.svg";
import noite_limpa from "./img/noite-limpa.svg";
import noite_nublada from "./img/noite-nublada.svg";
import nublado from "./img/nublado.svg";
import tempestade from "./img/tempestade.svg";
import chuva from "./img/chuva.svg";
import desconhecido from "./img/desconhecido.svg";

export default function App() {

	const [name, setName]= useState('');
	const [cidade, setCidade] = useState();

	useEffect(() => {
		api
			.get('', {params: {city_name: name, locale: "pt"}})
			.then((response) => setCidade(response.data))
			.catch((err) => {
				console.error("Erro:" + err);
			});
	}, []);

	function iconeCondicao(condicao_slug) {
		switch (condicao_slug) {
			case "storm":
				return tempestade
			case "snow":
				return neve
			case "hail":
				return granizo
			case "rain":
				return chuva
			case "fog":
				return neblina
			case "clear_day":
				return dia_limpo
			case "clear_night":
				return noite_limpa
			case "cloud":
				return nublado
			case "cloudly_day":
				return dia_nublado
			case "cloudly_night":
				return noite_nublada
			case "none_day":
				return dia_limpo
			case "none_night":
				return erro_noite
			default:
				return desconhecido
		}
	}

	const onChangeCidade = (e) => {
		setName(e.target.value);
		console.log(e.target.value)
	}

	const getDados = async () => {
		await api.get('', {params: {city_name: name, locale: "pt"}})
			.then((response) => {
				setCidade((response.data.success === true ? [] : response.data));
			});
	}

	const consultarAPI = () => {
		getDados()
	}

	return (
		<div className="App">
			<div className={"inputContainer"}>
				<input onChange={onChangeCidade} type={"text"}/>
				<button onClick={consultarAPI} type={"button"}>Buscar</button>
			</div>
			<div className={"weatherContainer"}>
				<div className={"actualInfo"}>
					<div className={"cityInfo"}>
						<div>
							<h1>{cidade?.results.city}</h1>
							<p>{cidade?.results.description}</p>
							<div className={"meteorologicalConditions"}>
								<p className={"umidade"}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										 className="bi bi-droplet" viewBox="0 0 16 16">
										<path fillRule="evenodd"
											  d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
										<path fillRule="evenodd"
											  d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/>
									</svg>
									Umidade: {cidade?.results.humidity}%
								</p>
								<p className={"vento"}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										 className="bi bi-wind" viewBox="0 0 16 16">
										<path
											d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
									</svg>
									Vento: {cidade?.results.wind_speedy}</p>
							</div>
						</div>
						<div className={"currentCityStatus"}>
							<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.condition_slug)}
								 alt={''}/>
							<h2 className={"celsius"}>{cidade?.results.temp}ºC</h2>
						</div>
					</div>
				</div>
				<div className={"futureInfo"}>
					<div className={"futureItem"}>
						<small>{cidade?.results.forecast[1].date}</small>
						<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.forecast[1].condition)}
							 alt={''}/>
						<div className={"forecast"}>
							<p className={"max"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkorange"
									 className="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
								</svg>
								{cidade?.results.forecast[1].max}ºC
							</p>
							<p className={"min"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue"
									 className="bi bi-arrow-down" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
								</svg>
								{cidade?.results.forecast[1].min}ºC
							</p>
						</div>
					</div>
					<div className={"futureItem"}>
						<small>{cidade?.results.forecast[2].date}</small>
						<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.forecast[2].condition)}
							 alt={''}/>
						<div className={"forecast"}>
							<p className={"max"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkorange"
									 className="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
								</svg>
								{cidade?.results.forecast[2].max}ºC
							</p>
							<p className={"min"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue"
									 className="bi bi-arrow-down" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
								</svg>
								{cidade?.results.forecast[2].min}ºC
							</p>
						</div>
					</div>
					<div className={"futureItem"}>
						<small>{cidade?.results.forecast[3].date}</small>
						<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.forecast[3].condition)}
							 alt={''}/>
						<div className={"forecast"}>
							<p className={"max"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkorange"
									 className="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
								</svg>
								{cidade?.results.forecast[3].max}ºC
							</p>
							<p className={"min"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue"
									 className="bi bi-arrow-down" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
								</svg>
								{cidade?.results.forecast[3].min}ºC
							</p>
						</div>
					</div>
					<div className={"futureItem"}>
						<small>{cidade?.results.forecast[4].date}</small>
						<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.forecast[4].condition)}
							 alt={''}/>
						<div className={"forecast"}>
							<p className={"max"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkorange"
									 className="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
								</svg>
								{cidade?.results.forecast[4].max}ºC
							</p>
							<p className={"min"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue"
									 className="bi bi-arrow-down" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
								</svg>
								{cidade?.results.forecast[4].min}ºC
							</p>
						</div>
					</div>
					<div className={"futureItem"}>
						<small>{cidade?.results.forecast[5].date}</small>
						<img className={"conditionIcon"} src={iconeCondicao(cidade?.results.forecast[5].condition)}
							 alt={''}/>
						<div className={"forecast"}>
							<p className={"max"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkorange"
									 className="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
								</svg>
								{cidade?.results.forecast[5].max}ºC
							</p>
							<p className={"min"}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue"
									 className="bi bi-arrow-down" viewBox="0 0 16 16">
									<path fillRule="evenodd"
										  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
								</svg>
								{cidade?.results.forecast[5].min}ºC
							</p>
						</div>
					</div>
				</div>
			</div>
			<small className={"RT"}>Roberto Torres</small>
		</div>
	);
}