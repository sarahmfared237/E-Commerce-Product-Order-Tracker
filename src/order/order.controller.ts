import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';
import { RolesGuard } from 'src/middleware/roles.guard';
import { Roles } from 'src/middleware/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
// create order
  @Post()
  create(@Req() req) {
    const createOrderDto: CreateOrderLineDto[] = req.body;
    return this.orderService.create(createOrderDto, req.user._id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Get('me')
  findMyOrders(@Req() req) {
    return this.orderService.findMyOrders(req.user._id);
  }
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  update(@Param('id') id: string) {
    return this.orderService.update(id);
  }


}
