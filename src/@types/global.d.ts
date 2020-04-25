declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface ProductTypes {
  _id?: number;
  name?: string;
  picture?: string;
  detailPicture?: string;
  brand?: string;
  coreCount?: number;
  price?: number;
  rating?: number;
  count?: number;
  sum?: number;
}

interface CategoryTypes {
  id?: number;
  name?: string;
  url?: string | undefined;
  picture?: string;
}