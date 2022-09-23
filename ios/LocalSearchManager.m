//
//  LocalSearchManager.m
//  comaty
//
//  Created by 黒澤陸 on 2022/09/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocalSearchManager, NSObject)
RCT_EXTERN_METHOD(searchForLocations: (NSString *)text resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(searchForCoodinate: (NSString *)query resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
