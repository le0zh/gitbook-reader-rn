#import "MyNativeModule.h"
#import <React/RCTLog.h>
#import "SSZipArchive.h"

@implementation MyNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(unZipFile:(NSString *)zipFileString outPathString:(NSString *)outPathString findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [SSZipArchive unzipFileAtPath:zipFileString toDestination: outPathString];
  resolve(@"done");
}

@end
