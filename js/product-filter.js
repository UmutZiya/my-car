// Simplified car data structure - flat arrays for easier management
const carData = {
    brands: [
        'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Toyota', 'Honda', 
        'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volvo', 'Peugeot', 
        'Renault', 'Citroen', 'Fiat', 'Alfa Romeo', 'Jaguar', 'Land Rover'
    ],
    
    models: {
        'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'CLA', 'CLS'],
        'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7'],
        'Audi': ['A1', 'A3', 'A4', 'A6', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8'],
        'Volkswagen': ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'T-Cross', 'T-Roc', 'Arteon'],
        'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Explorer', 'Mustang', 'Ranger'],
        'Toyota': ['Yaris', 'Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser'],
        'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Insight'],
        'Nissan': ['Micra', 'Sentra', 'Altima', 'Qashqai', 'X-Trail', 'Pathfinder'],
        'Hyundai': ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
        'Kia': ['Picanto', 'Rio', 'Ceed', 'Optima', 'Sportage', 'Sorento'],
        'Mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9'],
        'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Ascent'],
        'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90'],
        'Peugeot': ['208', '308', '508', '2008', '3008', '5008'],
        'Renault': ['Clio', 'Megane', 'Talisman', 'Captur', 'Kadjar', 'Koleos'],
        'Citroen': ['C1', 'C3', 'C4', 'C5', 'C3 Aircross', 'C5 Aircross'],
        'Fiat': ['500', 'Panda', 'Tipo', '500X', '500L'],
        'Alfa Romeo': ['Giulietta', 'Giulia', 'Stelvio'],
        'Jaguar': ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace'],
        'Land Rover': ['Range Rover Evoque', 'Range Rover Sport', 'Range Rover', 'Discovery', 'Defender']
    },
    
    versions: [
        '1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '2.2', '2.4', '2.5', '2.8', '3.0', '3.5', '4.0',
        '1.0 TSI', '1.4 TSI', '1.5 TSI', '2.0 TSI', '2.5 TSI', '3.0 TSI',
        '1.6 TDI', '2.0 TDI', '2.2 TDI', '3.0 TDI',
        '1.0 EcoBoost', '1.5 EcoBoost', '2.0 EcoBoost', '2.3 EcoBoost',
        'Hybrid', 'Plug-in Hybrid', 'Electric', 'AMG', 'M Performance', 'S-Line', 'R-Line', 'ST', 'GTI', 'RS'
    ],
    
    generations: [
        '2015-2018', '2016-2019', '2017-2020', '2018-2021', '2019-2022', '2020-2023', '2021-2024', '2022-present',
        '2013-2016', '2014-2017', '2012-2015', '2011-2014', '2010-2013', '2009-2012', '2008-2011', '2007-2010'
    ],
    
    types: [
        'Hatchback', 'Sedan', 'Estate/Wagon', 'SUV', 'Crossover', 'Coupe', 'Convertible', 
        'Pickup', 'Van', 'MPV', 'Roadster', 'Limousine'
    ]
};

// DOM elements
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const versionSelect = document.getElementById('versionSelect');
const generationSelect = document.getElementById('generationSelect');
const typeSelect = document.getElementById('typeSelect');
const clearBtn = document.getElementById('clearFilter');
const searchBtn = document.getElementById('searchFilter');

// Initialize filter
function initializeFilter() {
    populateSelect(brandSelect, carData.brands);
    
    // Initially disable all except brand
    modelSelect.disabled = true;
    versionSelect.disabled = true;
    generationSelect.disabled = true;
    typeSelect.disabled = true;
    
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    brandSelect.addEventListener('change', handleBrandChange);
    modelSelect.addEventListener('change', handleModelChange);
    versionSelect.addEventListener('change', handleVersionChange);
    generationSelect.addEventListener('change', handleGenerationChange);
    clearBtn.addEventListener('click', clearFilter);
    searchBtn.addEventListener('click', performSearch);
}

// Handle brand selection
function handleBrandChange() {
    const selectedBrand = brandSelect.value;
    
    resetSelect(modelSelect, 'Select Model');
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedBrand && carData.models[selectedBrand]) {
        populateSelect(modelSelect, carData.models[selectedBrand]);
        modelSelect.disabled = false;
    } else {
        modelSelect.disabled = true;
    }
    
    versionSelect.disabled = true;
    generationSelect.disabled = true;
    typeSelect.disabled = true;
}

// Handle model selection
function handleModelChange() {
    const selectedModel = modelSelect.value;
    
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedModel) {
        populateSelect(versionSelect, carData.versions);
        versionSelect.disabled = false;
    } else {
        versionSelect.disabled = true;
    }
    
    generationSelect.disabled = true;
    typeSelect.disabled = true;
}

// Handle version selection
function handleVersionChange() {
    const selectedVersion = versionSelect.value;
    
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedVersion) {
        populateSelect(generationSelect, carData.generations);
        generationSelect.disabled = false;
    } else {
        generationSelect.disabled = true;
    }
    
    typeSelect.disabled = true;
}

// Handle generation selection
function handleGenerationChange() {
    const selectedGeneration = generationSelect.value;
    
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedGeneration) {
        populateSelect(typeSelect, carData.types);
        typeSelect.disabled = false;
    } else {
        typeSelect.disabled = true;
    }
}

// Reset select element
function resetSelect(selectElement, placeholder) {
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
}

// Populate select element
function populateSelect(selectElement, options) {
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Clear all filters
function clearFilter() {
    brandSelect.value = '';
    modelSelect.value = '';
    versionSelect.value = '';
    generationSelect.value = '';
    typeSelect.value = '';
    
    resetSelect(modelSelect, 'Select Model');
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    modelSelect.disabled = true;
    versionSelect.disabled = true;
    generationSelect.disabled = true;
    typeSelect.disabled = true;
}

// Perform search
function performSearch() {
    const filters = {
        brand: brandSelect.value,
        model: modelSelect.value,
        version: versionSelect.value,
        generation: generationSelect.value,
        type: typeSelect.value
    };
    
    // Remove empty filters
    const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== '')
    );
    
    if (Object.keys(activeFilters).length === 0) {
        alert('Please select at least one filter option');
        return;
    }
    
    // Create search parameters
    const searchParams = new URLSearchParams(activeFilters);
    
    // Redirect to search results page
    const searchUrl = `/search-results.html?${searchParams.toString()}`;
    window.location.href = searchUrl;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFilter);