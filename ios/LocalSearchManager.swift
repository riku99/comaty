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
  
  @objc
  func searchForCoodinate(_ query: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = query
    let search = MKLocalSearch(request: searchRequest)
    search.start(completionHandler: {(response, error) in
      guard let response = response else {
        reject("notFound", "位置情報が見つかりませんでした。", nil)
        return
      }
      
      let coodinate = response.mapItems[0].placemark.coordinate
      let data = ["latitude": coodinate.latitude, "longitude": coodinate.longitude]
      resolve(data)
    })
  }
  
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    if !completer.results.isEmpty {
      let results = completer.results.compactMap{ (result) -> [String: String] in
        return ["title": result.title, "subtitle": result.subtitle]
      }
      self.searchForLocationsResolver?(results)
    } else {
      self.searchForLocationsRejecter?("notFound", "検索候補が見つかりませんでした。", nil)
    }
  }
}
