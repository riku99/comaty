//
//  LocalSearchManager.swift
//  comaty
//
//  Created by 黒澤陸 on 2022/09/23.
//

import Foundation
import MapKit

@objc(LocalSearchManager)
class LocalSearchManager: NSObject, MKLocalSearchCompleterDelegate {
  var searchCompleter = MKLocalSearchCompleter()
  var searchForLocationsResolver: RCTPromiseResolveBlock?
  var searchForLocationsRejecter: RCTPromiseRejectBlock?
  
  override public init() {
    super.init()
    searchCompleter.delegate = self
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func searchForLocations(_ text: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      self.searchCompleter.queryFragment = text
      self.searchForLocationsResolver = resolve
      self.searchForLocationsRejecter = reject
    }
  }
  
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    let results = completer.results.compactMap{ (result) -> [String: String] in
      return ["title": result.title, "subtitle": result.subtitle]
    }
    
    print(results[0])
    self.searchForLocationsResolver?(results)
  }
}
