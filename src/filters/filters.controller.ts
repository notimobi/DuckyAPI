import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUseTags
} from "@nestjs/swagger"
import { AccountIdParams } from "src/accounts/params/account-id.params"

import { FilterDetails } from "./class/filter-details.class"
import { FilterListItem } from "./class/filter-list-item.class"
import { CreateUpdateFilterDto } from "./dto/create-update-filter.dto"
import { FilterIdParams } from "./params/filter-id.params"

@Controller("accounts/:accountId/filters")
@ApiUseTags("Filters")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: "Invalid or expired token" })
@ApiBadRequestResponse({ description: "Error that is resolvable user side" })
@ApiInternalServerErrorResponse({ description: "Server error that is not resolvable user side" })
export class FiltersController {
  @Delete(":filterId")
  @ApiOperation({ title: "Delete filter" })
  @ApiOkResponse({ description: "Filter deleted successfully" })
  @ApiNotFoundResponse({ description: "No account or filter found with this id" })
  public async deleteFilter(@Request() req, @Param() filterIdParams: FilterIdParams): Promise<void> {}

  @Get()
  @ApiOperation({ title: "List filters" })
  @ApiOkResponse({ description: "A list of filters", type: FilterListItem, isArray: true })
  @ApiNotFoundResponse({ description: "No account found with this id or no filters found on this account" })
  public async getFilters(@Request() req, @Param() accountIdParams: AccountIdParams): Promise<void> {}

  @Get(":filterId")
  @ApiOperation({ title: "Get filter details" })
  @ApiOkResponse({ description: "Filter details", type: FilterDetails })
  @ApiNotFoundResponse({ description: "No account or filter found with this id" })
  public async getFilter(@Request() req, @Param() filterIdParams: FilterIdParams): Promise<void> {}

  @Post()
  @ApiOperation({ title: "Create a new filter" })
  @ApiCreatedResponse({ description: "Filter created successfully" })
  @ApiNotFoundResponse({ description: "No account found with this id" })
  public async createFilter(
    @Request() req,
    @Param() accountIdParams: AccountIdParams,
    @Body() createUpdateFilterDto: CreateUpdateFilterDto
  ): Promise<void> {
    console.log(createUpdateFilterDto)
  }

  @Put(":filterId")
  @ApiOperation({ title: "Update existing filter" })
  @ApiOkResponse({ description: "Account updated successfully" })
  @ApiNotFoundResponse({ description: "No account or filter found with this id" })
  public async updateFilter(
    @Request() req,
    @Param() filterIdParams: FilterIdParams,
    @Body() createUpdateFilterDto: CreateUpdateFilterDto
  ): Promise<void> {
    console.log(createUpdateFilterDto)
  }
}
