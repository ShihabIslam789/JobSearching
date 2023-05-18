import { jobTemplate } from './templates';
import { extractFormData, getCurrencySymbol } from './utils';


export class JobSearch {

  constructor(searchFormSelector, resultsContainerSelector, loadingElementSelector) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.loadingElement = document.querySelector(loadingElementSelector);
  }

  setCountryCode() {
    this.countryCode = 'gb';
    this.setCurrencySymbol();

    fetch('http://ip-api.com/json')
      .then(results => results.json())
      .then(results => {
        this.countryCode = results.countryCode.toLowerCase();
        this.setCurrencySymbol();
      });
    }

    setCurrencySymbol() {
      this.currencySymbol = getCurrencySymbol(this.countryCode);
    }
  
    configureFormListener() {
      this.searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.startLoading();
      this.resultsContainer.innerHTML = '';