declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface ProductTypes {
  _id?: number;
  name?: string;
  url?: string;
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
    cpu?: string;
  }
}

interface CategoryTypes {
  _id?: number;
  name?: string;
  url?: string | undefined;
  picture?: string;
}