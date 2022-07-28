import { OrderService, SwapService } from "../../../../services"
import { defaultAdminOrdersFields, defaultAdminOrdersRelations } from "."

import { MedusaError } from "medusa-core-utils"

/**
 * @oas [post] /orders/{id}/swaps/{swap_id}/cancel
 * operationId: "PostOrdersSwapCancel"
 * summary: "Cancels a Swap"
 * description: "Cancels a Swap"
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Order.
 *   - (path) swap_id=* {string} The ID of the Swap.
 * tags:
 *   - Swap
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             order:
 *               $ref: "#/components/schemas/order"
 */
export default async (req, res) => {
  const { id, swap_id } = req.params

  const swapService: SwapService = req.scope.resolve("swapService")
  const orderService: OrderService = req.scope.resolve("orderService")

  const swap = await swapService.retrieve(swap_id)

  if (swap.order_id !== id) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `no swap was found with the id: ${swap_id} related to order: ${id}`
    )
  }

  await swapService.cancel(swap_id)

  const order = await orderService.retrieve(id, {
    select: defaultAdminOrdersFields,
    relations: defaultAdminOrdersRelations,
  })

  res.json({ order })
}
