import { computed } from "@angular/core";
import { Car } from "../types/car.interface";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals'
import { SearchQueryParams } from "../types/searchQueryParams";
import { SortDirection } from "../types/enums/sortDirection.enum";
import { CarBrands } from "../types/enums/car-brands.enum";
import { CarTypes } from "../types/enums/car-types.enum";
import { Transmission } from "../types/enums/transmission.enum";
import { FuelType } from "../types/enums/fuel-type.enum";


export interface AppStore{
    isAuth:boolean,
    searchTerm: string,
    cars: Car[],
    page: number,
    pageSize: number,
    total: number,
    isLoading: boolean
    sortBy: string;
    minYear: number|undefined,
    sortDirection: SortDirection ,
    brand: CarBrands | undefined,
    model: string,
    type: CarTypes | undefined,
    transmission: Transmission| undefined,
    fuelType: FuelType| undefined,
    isNew: boolean | undefined,
    favoriteCars: Car[],
    handleExpansion: boolean,
    userEmail: string,
}

const defaultState: AppStore = {
    isAuth: false,
    searchTerm: '',
    cars: [],
    page: 0,
    pageSize: 8,
    total: 0,
    isLoading: false,
    sortBy: '',
    minYear: undefined,
    sortDirection: SortDirection.ASC,
    brand: undefined,
    model: '',
    type: undefined,
    transmission: undefined,
    fuelType: undefined,
    isNew: undefined,
    favoriteCars: [],
    handleExpansion: false,   
    userEmail: ''


}

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(defaultState),
    withMethods((state)=>({
        setIsAuth: (isAuth:boolean)=>{patchState(state,{isAuth})},
        setCars: (cars: Car[])=>{patchState(state, {cars})},
        setPage: (page:number)=>{patchState(state,{page})},
        setPageSize: (pageSize:number)=>{patchState(state, {pageSize})},
        setTotal:(total:number)=>{patchState(state, {total})},
        setIsLoading: (isLoading:boolean)=>{patchState(state, {isLoading})},
        setSearchTerm: (searchTerm: string)=>{patchState(state,{searchTerm, page: 0})},
        setSortBy: (sortBy: string)=>{patchState(state, {sortBy, page:0})},
        setSortDirection: (sortDirection: SortDirection)=>{patchState(state, {sortDirection, page:0})},
        setBrand: (brand: CarBrands)=>{patchState(state, {brand, page: 0})},
        setModel: (model:string)=>{patchState(state, {model, page: 0})},
        setType: (type:CarTypes)=>{patchState(state, {type, page: 0})},
        setTransmission: (transmission: Transmission)=>{patchState(state, {transmission, page:0})},
        setFuelType: (fuelType: FuelType)=>{patchState(state, {fuelType, page:0})},
        setIsNew: (isNew: boolean | undefined)=>{patchState(state, {isNew, page:0})},
        setMinYear: (value:string | undefined)=>{
            let minYearToNumber
            if(value){
                minYearToNumber = Number(value)
               
            }else{
                minYearToNumber = undefined
            }
                
            patchState(state, {minYear: minYearToNumber , page:0})},
        setHandleExpansion: (handleExpansion: boolean)=>{patchState(state, {handleExpansion})},
        setFavoriteCars: (car: Car)=>{ 
            if(!state.favoriteCars().find((c)=>c.id==car.id)){
               
                patchState(state,{favoriteCars: [...state.favoriteCars(), car]})
                return true
            }
            return false
        },
        removeFromFavorites:(car:Car)=>{
            let filtered = [] as Car[]
            state.favoriteCars().map((c)=>{ if(c.id !== car.id){filtered.push(c)} })
            patchState(state, {favoriteCars:[...filtered]})
        },
        setUserEmail:(userEmail:string)=>{ patchState(state, {userEmail})} ,
        resetSearchParams: ()=>{
            patchState(state, {
                searchTerm: '',
                page: 0,
                pageSize: 8,
                sortBy: '',
                sortDirection: SortDirection.ASC,
                brand: undefined,
                model: '',
                minYear: undefined,
                type: undefined,
                transmission: undefined,
                fuelType: undefined,
                isNew: undefined,
                favoriteCars: [],
                handleExpansion: false
            })
        }
    })),
    withComputed((state)=>({
        searchParams: computed(()=>{
            const searchParams: SearchQueryParams ={
                page: state.page(),
                pageSize: state.pageSize(),
                isNew: state.isNew()
            }
            if(state.minYear()){
                searchParams.minYear = state.minYear()
            }
            if(state.sortDirection()){
                searchParams.sortDirection = state.sortDirection()
            }
            if(state.searchTerm()){
                searchParams.searchTerm= state.searchTerm()
            }
            if(state.sortBy()){
                searchParams.sortBy= state.sortBy()
            }
            if(state.model()){
                searchParams.model = state.model()
            }
            if(state.brand()){
                searchParams.brand = state.brand()
            }
            if(state.type()){
                searchParams.type = state.type()
            }
            if(state.transmission()){
                searchParams.transmission = state.transmission()
            }
            if(state.fuelType()){
                searchParams.fuelType = state.fuelType()
            }
            return searchParams
        })
    })),
    withHooks({
        onInit:(state)=> {
            
            state.resetSearchParams()
        },
    })
)
