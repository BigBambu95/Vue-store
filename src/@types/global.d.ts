declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface ProductTypes {
  id?: number;
  name?: string;
  brand?: string;
  coreCount?: number;
  price?: number;
  rating?: number;
}