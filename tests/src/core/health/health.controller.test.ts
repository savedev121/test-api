import { HealthController } from "@core/health/health.controller";
import { createMock } from "@golevelup/ts-jest";
import { Logger } from "@nestjs/common";

describe("HealthController", () => {
  let healthController: HealthController;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    logger = createMock<Logger>();
    healthController = new HealthController(logger);
  });

  describe("run", () => {
    it("should return is healthy", () => {
      expect(healthController.run()).toEqual({ status: "ok" });
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
