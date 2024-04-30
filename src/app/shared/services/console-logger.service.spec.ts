import { ConsoleLoggerService } from "./console-logger.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Component } from "@angular/core";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatSnackBarHarness } from "@angular/material/snack-bar/testing";

@Component({
  selector: 'aj-test-console-logger',
  template: undefined,
  standalone: true,
})
class TestConsoleLoggerComponent {}

describe('ConsoleLoggerService', () => {
  let service: ConsoleLoggerService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [ConsoleLoggerService],
    }).compileComponents();

    service = TestBed.inject(ConsoleLoggerService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('debug', () => {
    it('should call console.debug in development mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => true);
      spyOn(console, 'debug');

      service.debug('test');

      expect(console.debug).toHaveBeenCalledWith('test: ', []);
    });

    it('should not call console.debug in production mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => false);
      spyOn(console, 'debug');

      service.debug('test');

      expect(console.debug).not.toHaveBeenCalled();
    });
  });

  describe('info', () => {
    it('should call console.info in development mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => true);
      spyOn(console, 'info');

      service.info('test');

      expect(console.info).toHaveBeenCalledWith('test: ', []);
    });

    it('should call openSnackBar in production mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => false);
      spyOn(service, 'openSnackBar');
      service.info('test');

      expect(service.openSnackBar).toHaveBeenCalledWith(
        'test',
        'OK',
        {duration: 5000, panelClass: 'info'},
      );
    });
  });

  describe('log', () => {
    it('should call console.log in development mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => true);
      spyOn(console, 'log');

      service.log('test');

      expect(console.log).toHaveBeenCalledWith('test: ', []);
    });

    it('should call openSnackBar in production mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => false);
      spyOn(service, 'openSnackBar');

      service.log('test');

      expect(service.openSnackBar).toHaveBeenCalledWith(
        'test',
        'OK',
        {duration: 5000, panelClass: 'log'},
      );
    });
  });

  describe('warn', () => {
    it('should call console.warn in development mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => true);
      spyOn(console, 'warn');

      service.warn('test');

      expect(console.warn).toHaveBeenCalledWith('test: ', []);
    });

    it('should call openSnackBar in production mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => false);
      spyOn(service, 'openSnackBar');

      service.warn('test');

      expect(service.openSnackBar).toHaveBeenCalledWith(
        'test',
        'OK',
        {duration: 10000, panelClass: 'warn'},
      );
    });
  });

  describe('error', () => {
    it('should call console.error in development mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => true);
      spyOn(console, 'error');

      service.error('test');

      expect(console.error).toHaveBeenCalledWith('test: ', []);
    });

    it('should call openSnackBar in production mode', () => {
      spyOn(service, 'isInDevelopmentMode').and.callFake(() => false);
      spyOn(service, 'openSnackBar');

      service.error('test');

      expect(service.openSnackBar).toHaveBeenCalledWith(
        'test',
        'OK',
        {duration: 0, panelClass: 'error'},
      );
    });
  });

  describe('openSnackBar', () => {
    it('should call snackBar.open with provided parameters', () => {
      spyOn(snackBar, 'open');

      service.openSnackBar('test-message', 'test-action', {});

      expect(snackBar.open).toHaveBeenCalledWith('test-message', 'test-action', {});
    });

    it('should show snackbar with message', async () => {
      const fixture = TestBed.createComponent(TestConsoleLoggerComponent);
      const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

      service.openSnackBar('test-message', 'test-action', {});

      const snackbar = await loader.getHarness(MatSnackBarHarness);

      expect(await snackbar.getMessage()).toBe('test-message');
      expect(await snackbar.getActionDescription()).toBe('test-action');
    });
  });
});
