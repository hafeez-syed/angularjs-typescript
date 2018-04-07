/**
 * Created by Hafeez Syed on 7/4/18.
 */
namespace app.productDetail {
    interface IProductDetailModel {
        title: string;
        product: app.domain.IProduct;
    }

    interface IProductParams extends ng.route.IRouteParamsService {
        productId: number;
    }

    class ProductDetailCtrl implements IProductDetailModel{
        title: string;
        product: app.domain.IProduct;

        static $inject = ['$routeParams', 'dataAccessService'];
        constructor(
            private $routeParams: IProductParams,
            private dataAccessService: app.common.DataAccessService
        ) {
            this.title = 'Product Detail';

            let productResource = dataAccessService.getProductResource();

            productResource.get(
                {productId: $routeParams.productId},
                (data: app.domain.IProduct) => {
                this.product = data;
            });
        }
    }

    angular
        .module('productManagement')
        .controller('ProductDetailCtrl', ProductDetailCtrl);
}