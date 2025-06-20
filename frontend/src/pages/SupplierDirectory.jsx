import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets.js'

const SupplierDirectory = () => {
  const [suppliers, setSuppliers] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [filterSuppliers, setFilterSuppliers] = useState([])
  const [regions, setRegions] = useState([])
  const [grainTypes, setGrainTypes] = useState([])

  // Dummy data - Replace with actual API call
  useEffect(() => {
    setSuppliers([
      {
        id: 1,
        name: "Northern Grain Co.",
        location: "Punjab",
        rating: 4.8,
        grainTypes: ["Wheat", "Rice"],
        certifications: ["ISO 9001", "FSSAI"],
        image: assets.supplier1,
        yearEstablished: 2010,
        monthlyCapacity: "5000 tons"
      },
      {
        id: 2,
        name: "Golden Harvest Ltd.",
        location: "Haryana",
        rating: 4.6,
        grainTypes: ["Wheat", "Barley"],
        certifications: ["ISO 9001"],
        image: assets.supplier2,
        yearEstablished: 2012,
        monthlyCapacity: "3000 tons"
      },
      // Add more supplier data as needed
    ])
  }, [])

  const toggleRegion = (e) => {
    if(regions.includes(e.target.value)){
      setRegions(prev => prev.filter(item => item !== e.target.value))
    } else {
      setRegions(prev => [...prev, e.target.value])
    }
  }

  const toggleGrainType = (e) => {
    if(grainTypes.includes(e.target.value)){
      setGrainTypes(prev => prev.filter(item => item !== e.target.value))
    } else {
      setGrainTypes(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let suppliersCopy = suppliers.slice()
    
    if(regions.length > 0){
      suppliersCopy = suppliersCopy.filter(supplier => 
        regions.includes(supplier.location)
      )
    }

    if(grainTypes.length > 0){
      suppliersCopy = suppliersCopy.filter(supplier => 
        supplier.grainTypes.some(grain => grainTypes.includes(grain))
      )
    }

    setFilterSuppliers(suppliersCopy)
  }

  useEffect(() => {
    applyFilter()
  }, [regions, grainTypes, suppliers])

  const SupplierCard = ({ supplier }) => (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={supplier.image || assets.default_supplier} 
          alt={supplier.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{supplier.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{supplier.location}</span>
            <span className="flex items-center gap-1">
              <img src={assets.star_icon} alt="rating" className="w-4 h-4" />
              {supplier.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-gray-600">
        <p><span className="font-medium">Grains: </span>
          {supplier.grainTypes.join(", ")}
        </p>
        <p><span className="font-medium">Monthly Capacity: </span>
          {supplier.monthlyCapacity}
        </p>
        <p><span className="font-medium">Established: </span>
          {supplier.yearEstablished}
        </p>
        <p><span className="font-medium">Certifications: </span>
          {supplier.certifications.join(", ")}
        </p>
      </div>
      
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full">
        Contact Supplier
      </button>
    </div>
  )

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Section */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} 
           className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} 
               className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} 
               alt="" />
        </p>

        {/* Region Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-xl font-medium'>Region</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="Punjab" onChange={toggleRegion}/>Punjab
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="Haryana" onChange={toggleRegion}/>Haryana
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="UP" onChange={toggleRegion}/>Uttar Pradesh
            </p>
          </div>
        </div>

        {/* Grain Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-xl font-medium'>Grain Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="Wheat" onChange={toggleGrainType}/>Wheat
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="Rice" onChange={toggleGrainType}/>Rice
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value="Barley" onChange={toggleGrainType}/>Barley
            </p>
          </div>
        </div>
      </div>

      {/* Suppliers List Section */}
      <div className='flex-1'>
        <div className='mb-6'>
          <Title text1={'VERIFIED'} text2={'SUPPLIERS'} />
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filterSuppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplierDirectory