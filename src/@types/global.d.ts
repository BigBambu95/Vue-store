declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface ProductTypes {
  _id?: number;
  name?: string;
  picture?: string;
  detailPicture?: string;
  price?: number;
  rating?: number;
  count?: number;
  sum?: number;
  options?: {
    brand?: string;
    coreCount?: number;
    os?: string;
    internalMemory?: number;
  }
}

interface CategoryTypes {
  id?: number;
  name?: string;
  url?: string | undefined;
  picture?: string;
}