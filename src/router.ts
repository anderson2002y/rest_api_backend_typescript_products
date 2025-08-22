import { Router} from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailibity, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErros } from "./middleware";

const router = Router();

/** 
* @swagger
* components:
*   schemas:
*     Product:
*       type: object
*       properties: 
*         id:
*           type: integer
*           description: The Product ID
*           example: 1
*         name:
*           type: string
*           description: The Product name
*           example: Monitor curvo de 49 pulgadas
*         price:
*           type: number
*           description: The Product price
*           example: 300
*         availability:
*           type: boolean
*           description: The Product availability
*           example: true
*/

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of product
 *      responses:
 *        200:
 *          description: Successful response
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *  
 *  
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags: 
 *        - Products
 *      description: Retunr a product based on its unique ID
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      responses: 
 *        200:
 *          description: Successful response
 *          content:
 *            aplication/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 *        404:
 *          description: Not found
 *        400:
 *          description: Bad Request - Invalid ID   
 */
router.get('/:id',
  param('id').isInt().withMessage("Id no valido"),
  handleInputErros,
  getProductsById
)

/**
 * @swagger
 * /api/products:
 *    post:
 *      summary: Create a new product
 *      tags:
 *        - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Monitor curvo de 49 pulgadas"
 *                price:
 *                  type: number
 *                  example: 290
 *      responses:
 *        201:
 *          description: Successful response
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data
 */
router.post('/', 

  // Validacion
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage("Valor no valido")
    .custom(value => value > 0 ).withMessage("Precio no valido")
    .notEmpty().withMessage('El precio del producto no puede ir vacio'),
  
  handleInputErros,
  createProduct 
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Returns the update product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *        required: true
 *        content: 
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Monitor curvo de 49 pulgadas"
 *                price:
 *                  type: number
 *                  example: 290
 *                availability:
 *                  type: boolean
 *                  example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request o invalid ID or Invalid input data
 *      404:
 *        description: Product Not Found
 */
router.put('/:id', 
  // Validacion
  param('id').isInt().withMessage("Id no valido"),
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage("Valor no valido")
    .custom(value => value > 0 ).withMessage("Precio no valido")
    .notEmpty().withMessage('El precio del producto no puede ir vacio'),
  body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),

  handleInputErros,
  updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Return the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses: 
 *      200:
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request o invalid ID
 *      404:
 *        description: Product Not Found
 */
router.patch('/:id',
  param('id').isInt().withMessage("Id no valido"),
  handleInputErros,
  updateAvailibity
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by a given ID
 *    tags:
 *      - Products
 *    description: Return confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Delete a product
 *        content: 
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto Eliminado'
 *      400:
 *        description: Bad request o invalid ID
 *      404:
 *        description: Product Not Found
 */
router.delete('/:id', 
  param('id').isInt().withMessage("Id no valido"),
  handleInputErros,
  deleteProduct
)

export default router;