import { expectTypeOf } from "expect-type"
import { StringSchema } from "../schema/string"

describe("String schema", () => {
  test("create string schema type", () => {
    const schema = new StringSchema()

    expectTypeOf(schema["$dataType"]).toEqualTypeOf<string>()
    expect(schema.parse("username")).toEqual({
      fieldName: "username",
      dataType: {
        name: "string",
      },
      nullable: false,
      optional: false,
      indexes: [],
      relationships: [],
    })
  })
})
