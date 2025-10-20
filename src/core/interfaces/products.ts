export interface IProducts {
    id: number,
    title: string,
    slug: string,
    price: number,
    discountPercentage: number,
    description: number,
    category: ICategories,
    images: [
      string,
      string,
      string
    ],
    isCart:boolean
}

export interface ICategories {
    id: number,
    name: string,
    slug: string,
    image: string,
    creationAt: string,
    updatedAt: string
}


// id: number,
// title: string,
// description: string,
// popular: boolean
// category: string,
// slug:string,
// price: number,
// discountPercentage: number,
// rating: number,
// stock: number,
// brand: string,
// sku: string,
// weight: number,
// warrantyInformation: string,
// shippingInformation:  string,
// availabilityStatus: string,
// returnPolicy: string,
// minimumOrderQuantity: number,
// images: string,
// isCart: boolean
