/**
 * @swagger
 * /api/v1/holds:
 *   get:
 *     summary: Get all book holds
 *     tags: [BookHolds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all book holds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 bookholds:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BookHoldResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/holds:
 *   post:
 *     summary: Create a new book hold
 *     tags: [BookHolds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookHoldRequest'
 *     responses:
 *       201:
 *         description: Book hold created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book Hold successful
 *                 bookhold:
 *                   $ref: '#/components/schemas/BookHold'
 *                 user:
 *                   $ref: '#/components/schemas/UserShort'
 *                 book:
 *                   $ref: '#/components/schemas/BookShort'
 *       404:
 *         description: User or book not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/holds/{bookId}:
 *   get:
 *     summary: Get book holds by book ID
 *     tags: [BookHolds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book holds for a specific book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 bookholds:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BookHoldResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/holds/{id}:
 *   delete:
 *     summary: Delete a book hold
 *     tags: [BookHolds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book hold ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: reservation deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * components:
 *   schemas:


 *     BookHold:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         bookId:
 *           type: integer
 *         expiresAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time

 */
