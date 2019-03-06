import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})

export class ScrollComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    var addCount = 20;
    var maxItems = 200;
    
    var template,
        container,content,template,height,target,
        firstItem=0,
        lastItem=0;
    
    container = $('#container');
    content = $('#content');
    template = $('#content-item-template').clone();
    $('#content-item-template').hide();
    
    container.scroll(function() {
        var active;
        var scrollTop = container.scrollTop();
        var height = content.height();
        var containerHeight = content.parent().height();
        
        $('#output').text('top: '+ scrollTop+', first line: ' + firstItem + ', last line: ' + lastItem + ', total lines: ' + (lastItem - firstItem)+', height: '+height);
    
        if (active) return;
        
        if (height-containerHeight-scrollTop<100) {
            active=true;
            addLines();
            active=false;
        }
    });
    
    $(document).ready(function() {
        addLines(40);
    });
    
    function addLines(toAdd?) {
        toAdd=toAdd || addCount;
        
        for (var i=0;i<toAdd;i++) {
            var clone = template.clone();
            clone.find('.line-number').text(lastItem);
            lastItem++;
            content.append(clone);
        }
       
    }
  }

}
