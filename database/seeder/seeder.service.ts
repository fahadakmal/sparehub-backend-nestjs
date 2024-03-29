import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/auth/entities/user_role.entity';
import { City } from '../../src/common/modules/address/entities/city.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { State } from 'src/common/modules/address/entities/state.entity';
import { Bank } from 'src/common/modules/bank/entities/bank.entity';
import { Brand } from 'src/common/modules/brand/entities/brand.entity';
import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';
import { DocumentType } from 'src/common/modules/documentType/entities/document_type.entity';
import { ProdCategory } from 'src/common/modules/product_category/entities/prod_category.entity';
import { ProductType } from 'src/common/modules/product_type/entities/prodouct_type.entity';
import { Permission } from 'src/role-permission/entities/permission.entity';
import { Role } from 'src/role-permission/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepositery: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleepositery: Repository<UserRole>,
    @InjectRepository(Country)
    private countryRepositery: Repository<Country>,
    @InjectRepository(State)
    private stateRepositery: Repository<State>,
    @InjectRepository(City)
    private cityRepositery: Repository<City>,
    @InjectRepository(Bank)
    private bankRepositery: Repository<Bank>,
    @InjectRepository(Brand)
    private brandRepositery: Repository<Brand>,
    @InjectRepository(CarMake)
    private carMakeRepositery: Repository<CarMake>,
    @InjectRepository(CarModel)
    private carModelRepositery: Repository<CarModel>,

    @InjectRepository(Role)
    private roleRepositery: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepositery: Repository<Permission>,
    @InjectRepository(ProdCategory)
    private prodCategoryRepo: Repository<ProdCategory>,
    @InjectRepository(ProductType)
    private productTypeRepositery: Repository<ProductType>,
    @InjectRepository(DocumentType)
    private decumentTypeRepositery: Repository<DocumentType>,
    // private authService: AuthService,

    // private fileUploadService: FileUploadService,
    // private companyService: CompanyService,
    // private productService: ProductService,
    private readonly logger: Logger,
  ) {}

  async seed() {
    try {
      //seed country in db
      const countries = await this.countryRepositery.find();
      const country = this.countryRepositery.create({
        countryCode: 'SA',
        countryName: 'Saudi Arabia',
        countryNameAr: 'المملكة العربية السعودية',
        dialCode: '+966',
        flag: '🇸🇦',
        mobilePrefix: '',
        countryCodeISO3: '',
        IbanLength: 14,
      });
      if (!countries.length) {
        await this.countryRepositery.save(country);
      }

      //seed state in db
      const states = await this.stateRepositery.find();

      const state = this.stateRepositery.create({
        stateCode: 'SA.TB',
        stateName: 'Tabūk',
        stateNameAr: 'Al-Ajman',
        iso: '7',
        fips: 'SA19',
        capital: 'Tabuk',
        country,
      });
      if (!states.length) {
        await this.stateRepositery.save(state);
      }

      const cities = await this.cityRepositery.find();

      //seed city in db
      const city = this.cityRepositery.create({
        cityName: 'Al-Wajh',
        cityNameAr: 'الوجه',
        state,
        country,
        stateCode1: 'TBK',
      });
      if (!cities.length) {
        await this.cityRepositery.save(city);
      }

      await this.createRolesAndPermissions();

      const prodCategories = await this.prodCategoryRepo.find();

      //seed product category
      const prodCategory = this.prodCategoryRepo.create({
        name: 'Auto Body Parts & Mirrors',
        nameAr: '01-اسم التصنيف',
        description: 'Auto Body Parts & Mirrors',
        descriptionAr: '01-اسم التصنيف',
        code: '01-01',
        priceTiers: null,
        images: null,
        childCount: 34,
        itemCount: null,
        parentId: 0,
        hierLevel: 1,
        sortOrder: 1,
        isActive: true,
      });
      if (!prodCategories.length) {
        await this.prodCategoryRepo.save(prodCategory);
      }

      // seed product type
      const productTypes = await this.productTypeRepositery.find();

      const prodouctType1 = this.productTypeRepositery.create({
        name: 'OEM',
        description: 'Maker Made Products',
        sortOrder: 1,
      });
      const prodouctType2 = this.productTypeRepositery.create({
        name: 'After Market',
        description: 'Local Made Products',
        sortOrder: 2,
      });
      if (!productTypes.length) {
        await this.productTypeRepositery.save([prodouctType1, prodouctType2]);
      }
      // seed bank in db
      const banks = await this.bankRepositery.find();

      const bank = this.bankRepositery.create({
        name: 'Al Rajhi Bank',
        nameAr: 'مصرف الراجحي',
        country,
      });
      if (!banks.length) {
        await this.bankRepositery.save(bank);
      }

      //seed brand in db
      const brands = await this.brandRepositery.find();

      const brand = this.brandRepositery.create({
        brandName: 'Mopar',
        brandNameAr: 'Mopar',
        sortOrder: 1,
      });
      if (!brands.length) {
        await this.brandRepositery.save(brand);
      }
      //seed car make
      const carMakes = await this.carMakeRepositery.find();

      const carMake = this.carMakeRepositery.create({
        make: 'Toyota',
        makeAr: 'Toyota',
        region: 'Asia',
      });
      if (!carMakes.length) {
        await this.carMakeRepositery.save(carMake);
      }

      //seed car model
      const carModels = await this.carModelRepositery.find();

      const variants = [
        { name: '4Runner-turbo', years: '2010,2020,2021,2022' },
        { name: '4Runner-1.8', years: '2009,2006,2002,2022' },
      ];
      const carModel = this.carModelRepositery.create({
        make: carMake,
        modelAr: '4Runner',
        model: '4Runner',
        variant: variants,
        carTypes: ['Sedan', 'Coupe'],
        sortOrder: 1,
        region: 'Asia',
        modelYear: '2010',
      });

      const carModel1 = this.carModelRepositery.create({
        make: carMake,
        modelAr: '4Runner',
        model: '4Runner',
        carTypes: ['Sedan', 'Coupe'],
        region: 'Asia',
        modelYear: '2020',
      });
      if (!carModels.length) {
        await this.carModelRepositery.save(carModel);
        await this.carModelRepositery.save(carModel1);
      }

      //seed document type in db
      const documentTypes = await this.decumentTypeRepositery.find();

      const documentType1 = this.decumentTypeRepositery.create({
        documentName: 'VAT',
      });
      const documentType2 = this.decumentTypeRepositery.create({
        documentName: 'CNIC',
      });
      if (!documentTypes.length) {
        await this.decumentTypeRepositery.save([documentType1, documentType2]);
      }

      //seed user in db
      //seed company in db
      //seed company bank
      //seed company document
      //seed company store
      //seed product
      //seed product fitment
      //seed product inventory
      //seed product media
    } catch (error) {
      throw error;
    }
  }

  async createRolesAndPermissions() {
    try {
      const permission1 = this.permissionRepositery.create({
        permissionName: 'Add Sparehub Admin',
        description: 'Can add, edit, remove Sparehub admins',
        module: 'SPAREHUB',
      });

      const permission2 = new Permission();
      permission2.permissionName = 'Add Seller Admins';
      permission2.description = 'Update seller profile. Add users';
      permission2.module = 'SPAREHUB';

      const permission3 = new Permission();
      permission3.permissionName = 'Add Products';
      permission3.description = 'Add, edit products';
      permission3.module = 'SPAREHUB';
      const permission4 = new Permission();
      permission4.permissionName = 'Publish Products';
      permission4.description = 'Publish, unpublish products';
      permission4.module = 'SPAREHUB';
      const permission5 = new Permission();
      permission5.permissionName = 'Orders View';
      permission5.description = 'Order listing and view details';
      permission5.module = 'SPAREHUB';
      const permission6 = new Permission();
      permission6.permissionName = 'Order package';
      permission6.description = 'Change order status, cancel, package, deliver';
      permission6.module = 'SPAREHUB';
      const permission7 = new Permission();
      permission7.permissionName = 'Reviews Reply';
      permission7.description = 'View and reply against reviews and questions';
      permission7.module = 'SPAREHUB';
      const permission8 = new Permission();
      permission8.permissionName = 'Review Delete';
      permission8.description = 'Review delete';
      permission8.module = 'SPAREHUB';

      const role = new Role();
      role.roleName = 'Sparehub Admin';
      role.roleDescription = 'Seller ';
      role.permissions = [permission1];
      role.moduleId = 'SPAREHUB';

      const role1 = new Role();
      role1.roleName = 'Seller Admin';
      role1.moduleId = 'SPAREHUB';
      role1.permissions = [permission2];

      const role2 = new Role();
      role2.roleName = 'Product Catalog';
      role2.moduleId = 'SPAREHUB';
      role2.permissions = [permission3, permission4];

      const role3 = new Role();
      role3.roleName = 'Order Processor';
      role3.moduleId = 'SPAREHUB';
      role3.permissions = [permission5, permission6];

      const role4 = new Role();
      role4.roleName = 'Review Mgr';
      role4.moduleId = 'SPAREHUB';
      role4.permissions = [permission7, permission8];

      const role5 = new Role();
      role5.roleName = 'Seller Super Admin';
      role5.moduleId = 'SPAREHUB';
      role5.permissions = [
        permission1,
        permission2,
        permission3,
        permission4,
        permission5,
        permission6,
        permission7,
        permission8,
      ];
      const roles = await this.roleRepositery.find();

      if (!roles.length) {
        await this.permissionRepositery.save([
          permission1,
          permission2,
          permission3,
          permission4,
          permission5,
          permission6,
          permission7,
          permission8,
        ]);
        await this.roleRepositery.save(role);
        await this.roleRepositery.save(role1);
        await this.roleRepositery.save(role3);
        await this.roleRepositery.save(role4);
        await this.roleRepositery.save(role5);
      }
    } catch (error) {
      throw error;
    }
  }
}
